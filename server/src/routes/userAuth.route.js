import express from "express";
import { adminProtectedRoute, login, register, userProtectedRoute } from "../controller/userAuth.controller.js";
import { loginValidation, registerValidation } from "../utils/express-validation.js";
import { authMiddleware, roleMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();


// Register
router.post("/register", registerValidation , register);

// Login
router.post("/login", loginValidation, login);

// admin protected route example
router.get( "/admin-dashboard" , authMiddleware , roleMiddleware(['ADMIN']) , adminProtectedRoute);

// admin protected route example
router.get( "/user-dashboard" , authMiddleware , roleMiddleware(['ADMIN' , 'USER']) , userProtectedRoute);

export default router;