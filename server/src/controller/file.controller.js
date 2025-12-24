import prisma from "../config/dataBase.js";
import { chunkText } from "../utils/chunking.js";
import { extractPdfText } from "../utils/parsePdf.js";
import cloudinary from "../config/cloudinary.js";
import { storeChunkInPinecone } from "../services/storeVectors.js";

export const uploadFile = async (req, res) => {
  try {
    const file = req.file;

    const parsedPdf = await extractPdfText(file.buffer); // pdf parsing
    const chunks = await chunkText(parsedPdf); // chunking text

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "raw",
            folder: "rag-datasets",
            use_filename: true,
            filename_override: req.file.originalname,
          },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        )
        .end(file.buffer);
    });

    await prisma.dataset.create({
      data: {
        filename: result.original_filename || `${result.public_id}.${result.format}`,
        url: result.secure_url,
        uploadedById: req.user.id,
        publicId : result.public_id
      },
    });

    await storeChunkInPinecone(chunks)
 

    return res.status(200).json({
      success: true,
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
};
