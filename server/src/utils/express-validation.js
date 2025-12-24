import { body } from "express-validator";

// Register Validation
export const registerValidation = [
  body("username").notEmpty().withMessage("Valid email required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

// Login Validation
export const loginValidation = [
  body("email").isEmail().withMessage("Valid email required"),
  body("password").notEmpty().withMessage("Password is required"),
];

// upload file validation 

export const uploadFileValidation = (req , res , next) =>{
    if(!req.file){
        return res.status(400).json({ errors: [{ msg: "File is required" }] }); 
    }
    next();
}

