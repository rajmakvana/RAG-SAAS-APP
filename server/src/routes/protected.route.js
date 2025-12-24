import { uploadFile } from "../controller/file.controller.js";
import { authMiddleware, roleMiddleware } from "../middleware/authMiddleware.js";
import { Router } from "express";   
import { uploadFileValidation } from "../utils/express-validation.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });


const router = Router();

router.get("/" , (req , res) => {
    res.send("working")
})

router.post("/upload" , authMiddleware , roleMiddleware(["ADMIN"]), upload.single("file"), uploadFileValidation ,  uploadFile);


export default router;