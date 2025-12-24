import express from "express";
import { adminProtectedRoute, login, register, userProtectedRoute } from "../controller/userAuth.controller.js";
import { loginValidation, registerValidation } from "../utils/express-validation.js";
import { authMiddleware, roleMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();


// Register
router.post("/register", registerValidation , register);

// Login
router.post("/login", loginValidation, login);

export default router;