import app from './src/app.js';
import express from 'express';
import { connectDB } from './src/config/dataBase.js';
import dotenv from 'dotenv';  
import cors from "cors";  
dotenv.config();


connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});