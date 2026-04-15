import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfModule = require("pdf-parse");
const pdfParse = pdfModule.default || pdfModule.PDFParse || pdfModule;

console.log("PDF PARSE TYPE: ", pdfParse);

export const extractRawTextFromPDF = async (buffer) => {
  try {
    const data = await pdfParse(buffer);
    console.log("PDF Data: ", data);

    const rawText = data.text;

    return rawText
      .replace(/\n+/g, "\n") // normalize line breaks
      .replace(/[ \t]+/g, " ") // normalize spaces
      .replace(/\n\s*\n/g, "\n") // remove extra blank lines
      .trim();
  } catch (err) {
    console.error("PDF parsing failed:", err);
    throw new Error("Failed to extract text from PDF");
  }
};

export default { extractRawTextFromPDF };
