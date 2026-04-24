import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Regex-based fallback when AI is unavailable
function regexFallback(text, docType) {
  const result = {};
  
  // Name
  const nameMatch = text.match(/(?:Name|Full\s*Name|Legal\s*Name|LN|FN)\s*[:\-]?\s*([A-Z][A-Za-z\s'-]{2,40})/i);
  if (nameMatch) result.name = nameMatch[1].trim().slice(0, 80);
  
  // SSN
  const ssnMatch = text.match(/\b(\d{3})\s*[-–—.\s]\s*(\d{2})\s*[-–—.\s]\s*(\d{4})\b/);
  if (ssnMatch) {
    result.taxIdType = 'SSN';
    result.taxId = `${ssnMatch[1]}-${ssnMatch[2]}-${ssnMatch[3]}`;
  }
  
  // EIN
  if (!result.taxId) {
    const einMatch = text.match(/\b(\d{2})\s*[-–]\s*(\d{7})\b/);
    if (einMatch) {
      result.taxIdType = 'EIN';
      result.taxId = `${einMatch[1]}-${einMatch[2]}`;
    }
  }
  
  // Street address
  const streetMatch = text.match(/\d+\s+[A-Za-z0-9\s]+?\s+(?:ST|STREET|AVE|AVENUE|BLVD|DR|DRIVE|RD|ROAD|LN|LANE|WAY|CT|PL)\b[.,]?\s*(?:APT|STE|SUITE|UNIT|#)?\s*[A-Z0-9]*/i);
  if (streetMatch) result.street = streetMatch[0].trim().slice(0, 100);
  
  // City, State, ZIP
  const cszMatch = text.match(/([A-Za-z\s.]{2,25}),?\s+(AL|AK|AZ|AR|CA|CO|CT|DE|DC|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY)\s+(\d{5}(?:-\d{4})?)/);
  if (cszMatch) {
    result.city = cszMatch[1].trim();
    result.state = cszMatch[2];
    result.zip = cszMatch[3];
  }
  
  // Business name
  const bizMatch = text.match(/(?:Business\s*Name|Company|Entity|DBA)\s*[:\-]?\s*([A-Za-z0-9\s',.-]+)/i);
  if (bizMatch) result.businessName = bizMatch[1].trim().slice(0, 80);
  
  return result;
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const docType = formData.get('docType');
    
    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const imageBase64 = Buffer.from(arrayBuffer).toString('base64');
    const mimeType = file.type;

    // If no Gemini API key
    if (!GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY not set');
      return NextResponse.json({ error: 'AI not configured' }, { status: 501 });
    }

    // --- AI-Powered Extraction ---
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const docTypeLabel = {
      'drivers-license': "a US Driver's License or State ID card",
      'ssn-card':        'a US Social Security Card',
      'passport':        'a US Passport',
      'ein-letter':      'an IRS EIN Confirmation Letter (CP 575)',
      'previous-w9':     'a previously filled IRS W-9 form',
      'other':           'an unknown document type',
    }[docType] || 'an unknown document type';

    const promptText = `You are a document data extraction specialist. The attached image is ${docTypeLabel}.

Your task: Extract W-9 form fields present in the image. Return ONLY valid JSON. If a field is not found, DO NOT include the key in the JSON. Never fabricate data. Ensure you clean up common OCR mistakes.

Fields to extract:
- "name": Full legal name of the individual. MUST format as "First Middle Last".
- "businessName": Business/entity name (if different from personal name).
- "taxIdType": "SSN" or "EIN".
- "taxId": Tax ID number. SSN must be XXX-XX-XXXX, EIN must be XX-XXXXXXX. Formatted properly.
- "street": Street address including number, name, and apt.
- "city": City name.
- "state": Two-letter US state code (e.g., "NY", "CA").
- "zip": ZIP code (5 digits).

Document-Specific Rules:
1. Driver's Licenses: Names often appear as "Surname, Given Name" or with labels like "LN", "FN", "1", "2". You MUST reverse orders like "DOE, JOHN" or "LN DOE FN JOHN" to "John Doe".
2. SSN Cards: Ignore watermarks like "SAMPLE" and boilerplate text ("VALID FOR WORK ONLY", "DHS AUTHORIZATION", "SOCIAL SECURITY"). The name usually appears right above the signature line or under "ESTABLISHED FOR".
3. Passports: Highly prioritize the Machine Readable Zone (MRZ/the '<<<' lines) at the bottom for accurate name extraction.
4. Capitalization: Output names in standard Title Case (e.g., "John Doe", not "JOHN DOE").
5. Do NOT include any markdown formatting, code blocks, or explanation in your response — output ONLY the raw JSON object.`;

    const promptParts = [
      promptText,
      {
        inlineData: {
          data: imageBase64,
          mimeType: mimeType || 'image/jpeg'
        }
      }
    ];

    const result = await model.generateContent(promptParts);
    const responseText = result.response.text().trim();
    
    // Parse the AI response — handle potential markdown wrapping
    let extracted;
    try {
      // Strip markdown code fences if present
      let jsonStr = responseText;
      if (jsonStr.startsWith('```')) {
        jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
      }
      extracted = JSON.parse(jsonStr);
    } catch (parseErr) {
      console.error('Failed to parse AI response:', responseText);
      // Fall back to regex
      extracted = regexFallback(ocrText, docType);
      return NextResponse.json({ extracted, method: 'regex-fallback' });
    }

    // Sanitize and validate the AI output
    const sanitized = {};
    const validStates = ['AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
    
    if (extracted.name && typeof extracted.name === 'string') {
      sanitized.name = extracted.name.trim().slice(0, 80);
    }
    if (extracted.businessName && typeof extracted.businessName === 'string') {
      sanitized.businessName = extracted.businessName.trim().slice(0, 80);
    }
    if (extracted.taxIdType && ['SSN', 'EIN'].includes(extracted.taxIdType)) {
      sanitized.taxIdType = extracted.taxIdType;
    }
    if (extracted.taxId && typeof extracted.taxId === 'string') {
      const clean = extracted.taxId.replace(/[^0-9-]/g, '');
      // Validate SSN format (XXX-XX-XXXX) or EIN format (XX-XXXXXXX)
      if (/^\d{3}-\d{2}-\d{4}$/.test(clean) || /^\d{2}-\d{7}$/.test(clean)) {
        sanitized.taxId = clean;
        if (!sanitized.taxIdType) {
          sanitized.taxIdType = clean.length === 11 ? 'SSN' : 'EIN';
        }
      }
    }
    if (extracted.street && typeof extracted.street === 'string') {
      sanitized.street = extracted.street.trim().slice(0, 100);
    }
    if (extracted.city && typeof extracted.city === 'string') {
      sanitized.city = extracted.city.trim().slice(0, 50);
    }
    if (extracted.state && validStates.includes(extracted.state)) {
      sanitized.state = extracted.state;
    }
    if (extracted.zip && typeof extracted.zip === 'string') {
      const zipClean = extracted.zip.replace(/[^0-9-]/g, '');
      if (/^\d{5}(-\d{4})?$/.test(zipClean)) {
        sanitized.zip = zipClean;
      }
    }

    return NextResponse.json({ extracted: sanitized, method: 'ai' });

  } catch (error) {
    console.error('Document extraction API error:', error);
    // On any error, return the actual error message while debugging
    return NextResponse.json({ error: error.message || 'Extraction failed' }, { status: 500 });
  }
}
