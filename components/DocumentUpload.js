'use client';

import { useState, useRef } from 'react';

// ----- Document types and what each one can provide -----
const DOC_TYPES = [
  {
    id: 'drivers-license',
    label: "Driver's License / State ID",
    icon: '🪪',
    desc: 'Extracts name, address (street, city, state, ZIP)',
    fields: ['name', 'street', 'city', 'state', 'zip'],
  },
  {
    id: 'ssn-card',
    label: 'Social Security Card',
    icon: '🔒',
    desc: 'Extracts name and SSN',
    fields: ['name', 'taxId'],
  },
  {
    id: 'passport',
    label: 'US Passport',
    icon: '📘',
    desc: 'Extracts full legal name',
    fields: ['name'],
  },
  {
    id: 'ein-letter',
    label: 'IRS EIN Confirmation (CP 575)',
    icon: '🏢',
    desc: 'Extracts business name, EIN, and address',
    fields: ['name', 'businessName', 'taxId', 'street', 'city', 'state', 'zip'],
  },
  {
    id: 'previous-w9',
    label: 'Previously Filled W-9',
    icon: '📄',
    desc: 'Extracts all available W-9 fields',
    fields: ['name', 'businessName', 'taxId', 'street', 'city', 'state', 'zip'],
  },
  {
    id: 'other',
    label: 'Other Document',
    icon: '📋',
    desc: 'We\u2019ll try to extract whatever we can find',
    fields: ['name', 'businessName', 'taxId', 'street', 'city', 'state', 'zip'],
  },
];

const W9_REQUIRED_FIELDS = {
  name: 'Full Name',
  street: 'Street Address',
  city: 'City',
  state: 'State',
  zip: 'ZIP Code',
  taxId: 'Tax ID (SSN/EIN)',
};

export default function DocumentUpload({ onDataExtracted }) {
  const [docType, setDocType] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [error, setError] = useState('');
  const [extractedResult, setExtractedResult] = useState(null);
  const [rawText, setRawText] = useState('');
  const [showRaw, setShowRaw] = useState(false);
  const fileRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/bmp', 'image/tiff'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload an image file (JPG, PNG, WebP, BMP, or TIFF).');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be under 10 MB.');
      return;
    }

    setError('');
    setUploading(true);
    setProgress(0);
    setStatusText('Preparing image...');
    setExtractedResult(null);

    try {
      setProgress(50);
      setStatusText('Analyzing with AI Vision...');

      // Send to AI-powered extraction API using FormData to prevent JSON size limits
      let extracted;
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('docType', docType || 'other');

        const apiRes = await fetch('/api/extract-document', {
          method: 'POST',
          body: formData,
        });
        
        if (!apiRes.ok) {
          throw new Error(`API error: ${apiRes.status}`);
        }
        
        const apiData = await apiRes.json();
        extracted = apiData.extracted || {};
        console.log(`Extraction method: ${apiData.method}`, extracted);
      } catch (apiErr) {
        console.warn('AI extraction failed:', apiErr);
        extracted = {};
        setError('Extraction failed or servers are busy. Please try again or enter details manually.');
      }

      setProgress(100);
      setStatusText('Done!');
      // Only set results if not completely empty or if we didn't explicitly throw an error state
      if (Object.keys(extracted).length > 0) {
        setExtractedResult(extracted);
      } else if (!error) {
        setExtractedResult({}); // Fallback state handled in render
      }

    } catch (err) {
      console.error('File read error:', err);
      setError('Failed to process document image. Please try another file.');
    } finally {
      setUploading(false);
      setProgress(0);
      setStatusText('');
    }

    if (fileRef.current) fileRef.current.value = '';
  };

  const handleConfirm = () => {
    if (extractedResult) {
      onDataExtracted(extractedResult, rawText);
      setExtractedResult(null);
      setDocType(null);
    }
  };

  const handleRetry = () => {
    setExtractedResult(null);
    setError('');
  };

  // Calculate which W-9 fields are still missing
  const getMissingFields = () => {
    if (!extractedResult) return Object.keys(W9_REQUIRED_FIELDS);
    return Object.keys(W9_REQUIRED_FIELDS).filter(k => !extractedResult[k]);
  };

  // ---- RENDER ----

  // Phase 1: Choose document type
  if (!docType && !extractedResult) {
    return (
      <div className="doc-upload">
        <div className="doc-upload-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
          <span>Smart Document Scanner</span>
        </div>
        <p className="doc-upload-desc">
          Select the type of document you want to scan. We&apos;ll use optimised extraction for each document type.
        </p>
        <div className="doc-type-grid">
          {DOC_TYPES.map(dt => (
            <button
              key={dt.id}
              className="doc-type-card"
              onClick={() => setDocType(dt.id)}
              type="button"
            >
              <div className="doc-type-icon">{dt.icon}</div>
              <div className="doc-type-info">
                <div className="doc-type-label">{dt.label}</div>
                <div className="doc-type-desc">{dt.desc}</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: 'var(--text-muted)' }}><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Phase 3: Extraction results
  if (extractedResult) {
    const missing = getMissingFields();
    const found = Object.entries(extractedResult).filter(([, v]) => v);
    const currentDoc = DOC_TYPES.find(d => d.id === docType) || DOC_TYPES[DOC_TYPES.length - 1];

    return (
      <div className="doc-upload">
        <div className="doc-upload-header">
          <span style={{ fontSize: 20 }}>{currentDoc.icon}</span>
          <span>Extraction Results</span>
        </div>

        {found.length > 0 ? (
          <>
            <div className="doc-results-found">
              <div className="doc-results-badge doc-results-badge-ok">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                {found.length} field{found.length !== 1 ? 's' : ''} extracted
              </div>
              <div className="doc-results-list">
                {found.map(([key, val]) => (
                  <div key={key} className="doc-result-item doc-result-ok">
                    <span className="doc-result-label">{fieldLabel(key)}</span>
                    <span className="doc-result-value">{key === 'taxId' ? maskTaxId(val) : val}</span>
                  </div>
                ))}
              </div>
            </div>

            {missing.length > 0 && (
              <div className="doc-results-missing">
                <div className="doc-results-badge doc-results-badge-warn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
                  {missing.length} required field{missing.length !== 1 ? 's' : ''} still needed
                </div>
                <div className="doc-results-list">
                  {missing.map(k => (
                    <div key={k} className="doc-result-item doc-result-miss">
                      <span className="doc-result-label">{W9_REQUIRED_FIELDS[k]}</span>
                      <span className="doc-result-value" style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Not found — enter manually</span>
                    </div>
                  ))}
                </div>
                <div className="doc-results-tip">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                  <span>You can upload another document (e.g. SSN card for Tax ID) or enter the remaining fields manually in the form.</span>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="doc-results-missing" style={{ marginTop: 0 }}>
            <div className="doc-results-badge doc-results-badge-warn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
              Could not extract data
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, margin: '8px 0' }}>
              The image might be blurry, too dark, or the document layout wasn&apos;t recognised.
              Try a clearer, well-lit photo or enter your details manually.
            </p>
          </div>
        )}

        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          {found.length > 0 && (
            <button className="btn btn-primary btn-sm" onClick={handleConfirm} type="button" style={{ flex: 1 }}>
              ✓ Apply Extracted Data
            </button>
          )}
          <button className="btn btn-outline btn-sm" onClick={handleRetry} type="button" style={{ flex: found.length > 0 ? 'none' : 1 }}>
            ↻ Try Another Document
          </button>
        </div>
      </div>
    );
  }

  // Phase 2: Upload zone for selected document type
  const currentDoc = DOC_TYPES.find(d => d.id === docType);

  return (
    <div className="doc-upload">
      <div className="doc-upload-header">
        <span style={{ fontSize: 20 }}>{currentDoc.icon}</span>
        <span>{currentDoc.label}</span>
      </div>

      <div className="doc-type-tips">
        <div className="doc-type-tips-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          Tips for best results
        </div>
        <ul className="doc-type-tips-list">
          {getDocTips(docType).map((tip, i) => <li key={i}>{tip}</li>)}
        </ul>
      </div>

      {!uploading ? (
        <>
          <label className="doc-upload-zone" htmlFor="doc-file-input">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" x2="12" y1="3" y2="15"/>
            </svg>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary)' }}>
              Upload {currentDoc.label}
            </span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>JPG, PNG, WebP • Max 10 MB</span>
            <input
              ref={fileRef}
              id="doc-file-input"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
          </label>
          <button className="btn btn-outline btn-sm" onClick={() => setDocType(null)} type="button" style={{ width: '100%', marginTop: 8 }}>
            ← Choose A Different Document
          </button>
        </>
      ) : (
        <div className="doc-upload-progress">
          <div className="doc-progress-bar">
            <div className="doc-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <p className="doc-progress-text">{statusText} ({progress}%)</p>
        </div>
      )}

      {error && <div className="doc-upload-error">{error}</div>}
    </div>
  );
}


// ===========================================================================
//  DOCUMENT-TYPE-AWARE PARSING
// ===========================================================================

function parseByDocType(text, docType) {
  switch (docType) {
    case 'drivers-license': return parseDriversLicense(text);
    case 'ssn-card':        return parseSSNCard(text);
    case 'passport':        return parsePassport(text);
    case 'ein-letter':      return parseEINLetter(text);
    case 'previous-w9':     return parsePreviousW9(text);
    default:                return parseGeneric(text);
  }
}

/**
 * DRIVER'S LICENSE / STATE ID
 * Common labels: DL, LN/FN, DOB, ADD, APT, CITY, ST, ZIP, SEX, HGT, WGT, EYES, CLASS, ISS, EXP
 * Name formats: "LN SMITH" + "FN JOHN", or "SMITH, JOHN", or just multi-cap names
 */
function parseDriversLicense(text) {
  const result = {};
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const joined = lines.join(' ');

  // ---- NAME ----
  // Pattern: "LN <last>" + "FN <first>"
  const lnMatch = joined.match(/\bLN\s+([A-Z][A-Z\s'-]+)/i);
  const fnMatch = joined.match(/\bFN\s+([A-Z][A-Z\s'-]+)/i);
  if (lnMatch && fnMatch) {
    result.name = clean(`${fnMatch[1].trim()} ${lnMatch[1].trim()}`).replace(/\b\w/g, c => c.toUpperCase());
  }

  // Pattern: "LAST NAME" / "FIRST NAME" labels
  if (!result.name) {
    const lastNameMatch = joined.match(/LAST\s*NAME\s*[:\-]?\s*([A-Za-z\s'-]+)/i);
    const firstNameMatch = joined.match(/FIRST\s*(?:NAME|GIVEN)\s*[:\-]?\s*([A-Za-z\s'-]+)/i);
    if (lastNameMatch && firstNameMatch) {
      result.name = clean(`${firstNameMatch[1].trim()} ${lastNameMatch[1].trim()}`).replace(/\b\w/g, c => c.toUpperCase());
    }
  }

  // Pattern: Line that looks like "LASTNAME, FIRSTNAME M" or "LASTNAME FIRSTNAME"
  if (!result.name) {
    for (const line of lines) {
      // "SMITH, JOHN MIDDLE"
      const commaName = line.match(/^([A-Za-z][A-Za-z'-]+)\s*,\s*([A-Za-z][A-Za-z\s'-]+)/);
      if (commaName) {
        result.name = clean(`${commaName[2].trim()} ${commaName[1].trim()}`).replace(/\b\w/g, c => c.toUpperCase());
        break;
      }
    }
  }

  // Very common: "1 SMITH" then "2 JOHN MICHAEL" (line numbers on DL)
  if (!result.name) {
    const line1 = lines.find(l => /^[12]\s+[A-Z]{2,}/.test(l));
    const line2 = lines.find(l => /^[23]\s+[A-Z]{2,}/.test(l) && l !== line1);
    if (line1 && line2) {
      const last = line1.replace(/^[0-9]\s+/, '').trim();
      const first = line2.replace(/^[0-9]\s+/, '').trim();
      result.name = clean(`${first} ${last}`);
    }
  }

  // Fallback: grab first all-caps multi-word line that isn't a header
  if (!result.name) {
    for (const line of lines) {
      if (/^[A-Z][A-Z\s'-]{2,30}$/.test(line) && !/DRIVER|LICENSE|STATE|IDENTIFICATION|DEPARTMENT|CLASS|DL|DOB|SEX|HGT|WGT|EXP|ISS|REAL\s*ID/i.test(line)) {
        result.name = clean(line);
        break;
      }
    }
  }

  // ---- ADDRESS ----
  // Pattern: "ADD <street>" or numbered line for address
  const addMatch = joined.match(/\bADD\s+(\d+\s+[A-Za-z0-9\s.,#-]+?)(?=\s+(?:APT|CITY|[A-Z]{2}\s+\d{5}|$))/i);
  if (addMatch) {
    result.street = clean(addMatch[1]);
  }

  // Generic street pattern
  if (!result.street) {
    const streetMatch = text.match(/\d+\s+[A-Za-z0-9\s]+?\s+(?:ST|STREET|AVE|AVENUE|BLVD|BOULEVARD|DR|DRIVE|RD|ROAD|LN|LANE|WAY|CT|COURT|PL|PLACE|PKWY|PARKWAY|CIR|CIRCLE|TRL|TRAIL)\b[.,]?\s*(?:APT|STE|SUITE|UNIT|#)?\s*[A-Z0-9]*/i);
    if (streetMatch) result.street = clean(streetMatch[0]);
  }

  // ---- CITY / STATE / ZIP ----
  const cszMatch = text.match(/([A-Za-z\s.]{2,25}),?\s+(AL|AK|AZ|AR|CA|CO|CT|DE|DC|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY)\s+(\d{5}(?:-\d{4})?)/);
  if (cszMatch) {
    result.city = clean(cszMatch[1]);
    result.state = cszMatch[2];
    result.zip = cszMatch[3];
  } else {
    // Try separate fields
    const stateMatch = text.match(/\b(AL|AK|AZ|AR|CA|CO|CT|DE|DC|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY)\b/);
    if (stateMatch) result.state = stateMatch[1];
    const zipMatch = text.match(/\b(\d{5}(?:-\d{4})?)\b/);
    if (zipMatch) result.zip = zipMatch[1];
  }

  return result;
}

/**
 * SOCIAL SECURITY CARD
 * Typically shows: "THIS NUMBER HAS BEEN ESTABLISHED FOR", the name, and the SSN in XXX-XX-XXXX format
 */
function parseSSNCard(text) {
  const result = {};
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const joined = lines.join(' ');

  // ---- SSN ----
  const ssnMatch = joined.match(/\b(\d{3})\s*[-–—.\s]\s*(\d{2})\s*[-–—.\s]\s*(\d{4})\b/);
  if (ssnMatch) {
    result.taxIdType = 'SSN';
    result.taxId = `${ssnMatch[1]}-${ssnMatch[2]}-${ssnMatch[3]}`;
  }

  // ---- NAME ----
  // Filter out common SSN card header text and watermarks
  const skip = /SOCIAL\s*SECURITY|ADMINISTRATION|THIS\s*NUMBER|ESTABLISHED|UNITED\s*STATES|SIGNATURE|NOT\s*VALID|FOR\s*WORK|WITH\s*DHS|AUTHORIZATION|SAMPLE/i;
  for (const line of lines) {
    // If line has the watermark "SAMPLE", try to remove it first before checking
    let cleanLine = line.replace(/S\s*A\s*M\s*P\s*L\s*E/i, '').replace(/SAMPLE/i, '').trim();
    if (!cleanLine) continue;
    if (skip.test(cleanLine)) continue;
    if (/^\d/.test(cleanLine)) continue; // skip SSN line or numbers

    // Name is typically all-caps
    if (/^[A-Za-z][A-Za-z\s'-]{2,40}$/.test(cleanLine) && cleanLine.split(/\s+/).length >= 2) {
      result.name = clean(cleanLine).replace(/\b\w/g, c => c.toUpperCase()); // Title Case
      break;
    }
  }

  // Fallback: look after "FOR"
  if (!result.name) {
    const afterFor = joined.match(/\bFOR\b\s+([A-Z][A-Z\s'-]{3,40})/);
    if (afterFor) {
      result.name = clean(afterFor[1].split(/\d/)[0].replace(/SAMPLE/i, '')).replace(/\b\w/g, c => c.toUpperCase());
    }
  }

  return result;
}

/**
 * US PASSPORT
 * MRZ (Machine Readable Zone) at bottom, or visual fields: Surname, Given Names
 */
function parsePassport(text) {
  const result = {};
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const joined = lines.join(' ');

  // ---- MRZ parsing (two lines of 44 characters) ----
  const mrzLines = lines.filter(l => /^[A-Z0-9<]{30,50}$/.test(l.replace(/\s/g, '')));
  if (mrzLines.length >= 2) {
    const mrzLine1 = mrzLines[0].replace(/\s/g, '');
    // P<USASURNAME<<GIVENNAME<MIDDLE<<<<<<<<
    const nameSection = mrzLine1.slice(5); // skip "P<USA"
    const [surname, ...givenParts] = nameSection.split('<<').filter(Boolean);
    const given = givenParts.join(' ').replace(/</g, ' ').trim();
    const last = surname.replace(/</g, ' ').trim();
    if (given && last) {
      result.name = clean(`${given} ${last}`);
    } else if (last) {
      result.name = clean(last);
    }
  }

  // ---- Visual field labels ----
  if (!result.name) {
    const surnameMatch = joined.match(/(?:Surname|SURNAME|Last\s*Name)\s*[/:\-]?\s*([A-Z][A-Za-z\s'-]+)/);
    const givenMatch = joined.match(/(?:Given\s*Names?|GIVEN\s*NAMES?|First\s*Name)\s*[/:\-]?\s*([A-Z][A-Za-z\s'-]+)/);
    if (surnameMatch && givenMatch) {
      result.name = clean(`${givenMatch[1].trim()} ${surnameMatch[1].trim()}`);
    } else if (surnameMatch) {
      result.name = clean(surnameMatch[1].trim());
    }
  }

  return result;
}

/**
 * IRS EIN CONFIRMATION LETTER (CP 575)
 * Contains: EIN, legal business name, responsible party, address
 */
function parseEINLetter(text) {
  const result = {};
  const joined = text.replace(/\n/g, ' ');

  // ---- EIN ----
  const einMatch = joined.match(/(?:EIN|Employer\s*Identification\s*Number)\s*[:\-]?\s*(\d{2})\s*[-–]\s*(\d{7})/i);
  if (einMatch) {
    result.taxIdType = 'EIN';
    result.taxId = `${einMatch[1]}-${einMatch[2]}`;
  } else {
    // Fallback: any XX-XXXXXXX pattern
    const fallback = text.match(/\b(\d{2})\s*[-–]\s*(\d{7})\b/);
    if (fallback) {
      result.taxIdType = 'EIN';
      result.taxId = `${fallback[1]}-${fallback[2]}`;
    }
  }

  // ---- Business name ----
  const bizMatch = joined.match(/(?:legal\s*name|entity\s*name|organization\s*name|business\s*name)\s*[:\-]?\s*(.+?)(?:\s{2,}|EIN|Employer|Address|Dear|$)/i);
  if (bizMatch) {
    result.businessName = clean(bizMatch[1].split(/[,\n.]/)[0]);
  }

  // ---- Responsible party name ----
  const rpMatch = joined.match(/(?:responsible\s*party|contact\s*person|principal\s*officer)\s*[:\-]?\s*([A-Z][A-Za-z\s'-]+)/i);
  if (rpMatch) {
    result.name = clean(rpMatch[1].split(/[,\n]/)[0]);
  }

  // ---- Address ----
  parseAddress(text, result);

  return result;
}

/**
 * PREVIOUS W-9
 * Look for W-9 field labels (Line 1, Line 2, etc.) and extract their values
 */
function parsePreviousW9(text) {
  const result = {};
  const joined = text.replace(/\n/g, ' ');

  // Line 1: Name
  const line1 = joined.match(/(?:Line\s*1|1\s*Name|income\s*tax\s*return)\s*[:\-]?\s*([A-Z][A-Za-z\s'-]+)/i);
  if (line1) result.name = clean(line1[1].split(/[,\n]/)[0]);

  // Line 2: Business name
  const line2 = joined.match(/(?:Line\s*2|2\s*Business|disregarded\s*entity)\s*[:\-]?\s*([A-Z][A-Za-z0-9\s',.-]+)/i);
  if (line2) result.businessName = clean(line2[1].split(/\n/)[0]);

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

  // Address
  parseAddress(text, result);

  return result;
}

/**
 * Generic / Other document
 */
function parseGeneric(text) {
  const result = {};

  // Name: labeled "Name:" or first capitalized multi-word line
  const nameMatch = text.match(/(?:Name|Full\s*Name|Legal\s*Name|Taxpayer\s*Name)\s*[:\-]?\s*([A-Za-z][A-Za-z\s'-]{2,40})/i);
  if (nameMatch) {
    result.name = clean(nameMatch[1].split(/[,\n]/)[0]).replace(/\b\w/g, c => c.toUpperCase());
  } else {
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    for (const line of lines.slice(0, 5)) {
      if (/^[A-Z][a-z]+\s+[A-Z][a-z]+/.test(line) && !/W-9|IRS|Tax|Form|Page/i.test(line)) {
        result.name = clean(line.split(/[,\n]/)[0]).replace(/\b\w/g, c => c.toUpperCase());
        break;
      }
    }
  }

  // Business name
  const bizMatch = text.match(/(?:Business\s*Name|Company|Entity|DBA)\s*[:\-]?\s*([A-Za-z0-9\s',.-]+)/i);
  if (bizMatch) result.businessName = clean(bizMatch[1].split(/[,\n]/)[0]);

  // SSN
  const ssnMatch = text.match(/\b(\d{3})\s*[-–—.\s]\s*(\d{2})\s*[-–—.\s]\s*(\d{4})\b/);
  if (ssnMatch) {
    result.taxIdType = 'SSN';
    result.taxId = `${ssnMatch[1]}-${ssnMatch[2]}-${ssnMatch[3]}`;
  } else {
    const einMatch = text.match(/\b(\d{2})\s*[-–]\s*(\d{7})\b/);
    if (einMatch) {
      result.taxIdType = 'EIN';
      result.taxId = `${einMatch[1]}-${einMatch[2]}`;
    }
  }

  // Address
  parseAddress(text, result);

  return result;
}


// ===========================================================================
//  SHARED HELPERS
// ===========================================================================

/** Shared address extractor */
function parseAddress(text, result) {
  // Street
  if (!result.street) {
    const streetMatch = text.match(/\d+\s+[A-Za-z0-9\s]+?\s+(?:ST|STREET|AVE|AVENUE|BLVD|BOULEVARD|DR|DRIVE|RD|ROAD|LN|LANE|WAY|CT|COURT|PL|PLACE|PKWY|PARKWAY|CIR|CIRCLE|TRL|TRAIL)\b[.,]?\s*(?:APT|STE|SUITE|UNIT|#)?\s*[A-Z0-9]*/i);
    if (streetMatch) result.street = clean(streetMatch[0]);
  }

  // City, State, ZIP
  if (!result.city || !result.state || !result.zip) {
    const cszMatch = text.match(/([A-Za-z\s.]{2,25}),?\s+(AL|AK|AZ|AR|CA|CO|CT|DE|DC|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY)\s+(\d{5}(?:-\d{4})?)/);
    if (cszMatch) {
      if (!result.city) result.city = clean(cszMatch[1]);
      if (!result.state) result.state = cszMatch[2];
      if (!result.zip) result.zip = cszMatch[3];
    } else {
      if (!result.state) {
        const sm = text.match(/\b(AL|AK|AZ|AR|CA|CO|CT|DE|DC|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY)\b/);
        if (sm) result.state = sm[1];
      }
      if (!result.zip) {
        const zm = text.match(/\b(\d{5}(?:-\d{4})?)\b/);
        if (zm) result.zip = zm[1];
      }
    }
  }
}

function clean(str) {
  if (!str) return '';
  return str.replace(/[^a-zA-Z0-9\s\-.,#/]/g, '').replace(/\s+/g, ' ').trim().slice(0, 100);
}

function fieldLabel(key) {
  const map = {
    name: 'Full Name',
    businessName: 'Business Name',
    street: 'Street Address',
    city: 'City',
    state: 'State',
    zip: 'ZIP Code',
    taxId: 'Tax ID',
    taxIdType: 'Tax ID Type',
  };
  return map[key] || key;
}

function maskTaxId(val) {
  if (!val) return '';
  const d = val.replace(/\D/g, '');
  if (d.length === 9 && val.includes('-') && val.indexOf('-') === 3) {
    return `•••-••-${d.slice(5)}`;
  }
  if (d.length === 9) return `••-${d.slice(2)}`;
  return val;
}

function getDocTips(docType) {
  switch (docType) {
    case 'drivers-license':
      return [
        'Place the card on a flat, dark surface',
        'Ensure the FRONT of the card is fully visible',
        'Avoid glare from overhead lights or holograms',
        'All text (name, address) should be in focus',
      ];
    case 'ssn-card':
      return [
        'Photograph the FRONT of the card only',
        'Make sure the SSN number is clearly visible',
        'Avoid covering any part of the card with your fingers',
        'Your data is never stored — processed in-memory only',
      ];
    case 'passport':
      return [
        'Show the photo/info page (page 2)',
        'Include the MRZ lines at the bottom if visible',
        'Ensure your full name and passport number are clear',
      ];
    case 'ein-letter':
      return [
        'Upload the CP 575 or other EIN confirmation letter',
        'Make sure the EIN number is clearly visible',
        'Include the business name and address sections',
      ];
    case 'previous-w9':
      return [
        'Upload a clear photo or scan of the filled-out form',
        'Page 1 of the W-9 is all that\u2019s needed',
        'Ensure all fields are legible and not cut off',
      ];
    default:
      return [
        'Use a well-lit, clear photo',
        'Ensure all text is legible and not blurry',
        'Crop the image to include only the relevant document',
      ];
  }
}
