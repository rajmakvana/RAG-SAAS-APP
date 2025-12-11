import { uploadFile } from "../controller/file.controller.js";
import { authMiddleware, roleMiddleware } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadFile.js";

import { Router } from "express";   


const router = Router();

router.get("/" , (req , res) => {
    res.send("working")
})

router.post("/upload" , authMiddleware , roleMiddleware(["ADMIN"]), upload.single("file"), uploadFile);


export default router;