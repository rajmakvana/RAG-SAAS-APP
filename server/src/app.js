import express from 'express';
const app = express();
import cors from "cors";
import userAuthRouter from './routes/userAuth.route.js'; // Import the userAuth route
import { authMiddleware, roleMiddleware } from './middleware/authMiddleware.js';

app.use(express.json());
app.use(express.urlencoded({extended:true}));   
app.use(cors());
app.use("/api/v1/user" , userAuthRouter);



export default app;
