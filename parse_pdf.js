const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function run() {
  const pdfBytes = fs.readFileSync('public/fw9.pdf');
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();
  const fields = form.getFields();
  const fieldNames = fields.map(f => f.getName());
  console.log("PDF FIELDS: ", fieldNames);
}

run();
