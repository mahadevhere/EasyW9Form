import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';

export async function generateW9Pdf(data) {
  let pdfBytes;
  if (typeof window !== 'undefined') {
    const response = await fetch('/fw9.pdf');
    pdfBytes = await response.arrayBuffer();
  } else {
    const fs = require('fs');
    const path = require('path');
    pdfBytes = fs.readFileSync(path.join(process.cwd(), 'public', 'fw9.pdf'));
  }

  const pdfDoc = await PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();

  const safeSetText = (fieldName, text) => {
    if (!text) return;
    try {
      const field = form.getTextField(fieldName);
      field.setText(text);
    } catch (e) {
      console.warn(`Failed to set text for field: ${fieldName}`);
    }
  };

  const safeCheck = (fieldName) => {
    try {
      const field = form.getCheckBox(fieldName);
      field.check();
    } catch (e) {
      console.warn(`Failed to check box: ${fieldName}`);
    }
  };

  // Line 1: Name
  safeSetText('topmostSubform[0].Page1[0].f1_01[0]', data.name);
  
  // Line 2: Business Name
  safeSetText('topmostSubform[0].Page1[0].f1_02[0]', data.businessName);

  // Line 3a: Tax classification checkboxes
  const taxMap = {
    'Individual': 'topmostSubform[0].Page1[0].Boxes3a-b_ReadOrder[0].c1_1[0]',
    'C-Corp': 'topmostSubform[0].Page1[0].Boxes3a-b_ReadOrder[0].c1_1[1]',
    'S-Corp': 'topmostSubform[0].Page1[0].Boxes3a-b_ReadOrder[0].c1_1[2]',
    'Partnership': 'topmostSubform[0].Page1[0].Boxes3a-b_ReadOrder[0].c1_1[3]',
    'Trust': 'topmostSubform[0].Page1[0].Boxes3a-b_ReadOrder[0].c1_1[4]',
    'LLC': 'topmostSubform[0].Page1[0].Boxes3a-b_ReadOrder[0].c1_1[5]',
    'Other': 'topmostSubform[0].Page1[0].Boxes3a-b_ReadOrder[0].c1_1[6]'
  };

  if (taxMap[data.taxClassification]) {
    safeCheck(taxMap[data.taxClassification]);
  }

  // LLC classification
  if (data.taxClassification === 'LLC' && data.llcClassification) {
    safeSetText('topmostSubform[0].Page1[0].Boxes3a-b_ReadOrder[0].f1_03[0]', data.llcClassification);
  }

  // Other classification text
  if (data.taxClassification === 'Other' && data.otherClassification) {
    safeSetText('topmostSubform[0].Page1[0].Boxes3a-b_ReadOrder[0].f1_04[0]', data.otherClassification);
  }

  // Line 4: Exemptions
  safeSetText('topmostSubform[0].Page1[0].f1_05[0]', data.exemptPayeeCode);
  safeSetText('topmostSubform[0].Page1[0].f1_06[0]', data.fatcaCode);

  // Line 5: Address
  safeSetText('topmostSubform[0].Page1[0].Address_ReadOrder[0].f1_07[0]', data.address);
  
  // Line 6: City, State, ZIP
  safeSetText('topmostSubform[0].Page1[0].Address_ReadOrder[0].f1_08[0]', data.cityStateZip);

  // Requester Name and Address (Line 5 right)
  safeSetText('topmostSubform[0].Page1[0].f1_09[0]', data.requesterName);

  // Line 7: Account Numbers
  safeSetText('topmostSubform[0].Page1[0].f1_10[0]', data.accountNumbers);

  // Part I: TIN
  if (data.taxId) {
    const clean = data.taxId.replace(/\D/g, '');
    if (data.taxIdType === 'SSN' && clean.length === 9) {
      safeSetText('topmostSubform[0].Page1[0].f1_11[0]', clean.slice(0, 3));
      safeSetText('topmostSubform[0].Page1[0].f1_12[0]', clean.slice(3, 5));
      safeSetText('topmostSubform[0].Page1[0].f1_13[0]', clean.slice(5));
    } else if (data.taxIdType === 'EIN' && clean.length === 9) {
      safeSetText('topmostSubform[0].Page1[0].f1_14[0]', clean.slice(0, 2));
      safeSetText('topmostSubform[0].Page1[0].f1_15[0]', clean.slice(2));
    }
  }

  const pages = pdfDoc.getPages();
  const page = pages[0];
  const signatureY = 196; // Fine-tuned position for W-9 (Rev. 3-2024) signature line
  const dateX = 420;

  // Draw Signature
  if (data.signatureImage && data.signatureType !== 'text') {
    try {
      // data.signatureImage is a base64 string like "data:image/png;base64,..."
      const base64Part = data.signatureImage.split(',')[1];
      const imageBytes = Uint8Array.from(atob(base64Part), c => c.charCodeAt(0));
      let image;
      if (data.signatureImage.includes('image/png')) {
        image = await pdfDoc.embedPng(imageBytes);
      } else {
        image = await pdfDoc.embedJpg(imageBytes);
      }
      
      // Dynamically scale to fit signature area (max 180pt wide, 32pt tall)
      const maxW = 180;
      const maxH = 32;
      const origW = image.width;
      const origH = image.height;
      const scale = Math.min(maxW / origW, maxH / origH, 1);
      const drawW = origW * scale;
      const drawH = origH * scale;

      page.drawImage(image, {
        x: 145,
        y: signatureY - 12 + (32 - drawH) / 2, // Center vertically in cell, shifted down
        width: drawW,
        height: drawH,
      });
    } catch (e) {
      console.error("Failed to embed signature image:", e);
      // Fallback to text if image fails
      const fontChoice = data.signatureFont === 'normal' ? StandardFonts.Helvetica : StandardFonts.TimesRomanItalic;
      const signatureFont = await pdfDoc.embedFont(fontChoice);
      const signName = data.signatureName || data.name || '';
      const rgbColor = data.signatureColor === 'black' ? rgb(0, 0, 0) : rgb(0, 0, 0.5);
      if (signName) {
        page.drawText(signName, { x: 145, y: signatureY + 1, size: 14, font: signatureFont, color: rgbColor });
      }
    }
  } else {
    // Dropback to text signature
    const fontChoice = data.signatureFont === 'normal' ? StandardFonts.Helvetica : StandardFonts.TimesRomanItalic;
    const signatureFont = await pdfDoc.embedFont(fontChoice);
    const signName = data.signatureName || data.name || '';
    const rgbColor = data.signatureColor === 'black' ? rgb(0, 0, 0) : rgb(0, 0, 0.5);
    if (signName) {
      page.drawText(signName, { 
        x: 145, 
        y: signatureY + 1, 
        size: 14, 
        font: signatureFont,
        color: rgbColor
      });
    }
  }

  // Draw Date
  let dateText = '';
  if (data.signatureDate) {
    const parts = data.signatureDate.split('-'); // YYYY-MM-DD
    if (parts.length === 3) {
      dateText = `${parseInt(parts[1])}/${parseInt(parts[2])}/${parts[0]}`;
    }
  }
  if (!dateText) {
    const d = new Date();
    dateText = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  }

  page.drawText(dateText, { 
    x: dateX, 
    y: signatureY + 1, 
    size: 10, 
    color: rgb(0, 0, 0) 
  });

  // Draft watermark on ALL pages if isDraft is true
  if (data.isDraft) {
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    pages.forEach((p) => {
      p.drawText('EASYW9FORM - SAMPLE PREVIEW', {
        x: 60,
        y: 150,
        size: 40,
        font: helveticaBold,
        color: rgb(0.1, 0.4, 0.9), // Blue-ish
        rotate: degrees(45),
        opacity: 0.1,
      });
    });
  }

  // Flatten the form to make fields uneditable in the final PDF
  form.flatten();

  return await pdfDoc.save();
}

