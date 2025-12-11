import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    const originalName = file.originalname; // correct filename
    const nameWithoutExt = originalName.replace(/\.[^/.]+$/, "");
    const ext = originalName.split(".").pop(); // pdf / txt / docx

    return {
      folder: "rag-datasets",
      resource_type: "raw",
      public_id: nameWithoutExt, // keep real name
      format: ext, // force file extension
      use_filename: true,
      unique_filename: false,
    };
  },
});

export const upload = multer({ storage });
