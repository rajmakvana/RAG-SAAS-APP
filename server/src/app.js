import express from 'express';
const app = express();
import cors from "cors";
import userAuthRouter from './routes/userAuth.route.js'; // Import the userAuth route
import protectedRouter from './routes/protected.route.js';
import chatRouter from './routes/chat.route.js'

app.use(express.json());
app.use(express.urlencoded({extended:true}));   
app.use(cors());

// all apis routes 
app.use("/api/v1/user" , userAuthRouter);
app.use("/api/v1/protected" , protectedRouter); // admin can file upload 
app.use("/api/v1/user/chat" , chatRouter );



export default app;
