import { PDFParse } from "pdf-parse";

// The function you want to call is the default export property

export const extractPdfText = async (fileBuffer) => {
  try {
   const pdfparse = new PDFParse({data : fileBuffer})
   const result = await pdfparse.getText();
   return result.text
    
  } catch (error) {
    console.error("PDF parse error:", error);
    throw error;
  }
};
