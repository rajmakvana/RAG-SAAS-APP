import {Router} from 'express';
import { userChat } from '../controller/chat.controller.js';
import { authMiddleware , roleMiddleware} from '../middleware/authMiddleware.js';

const router = Router();

router.post('/message' , authMiddleware , roleMiddleware(["USER" , "ADMIN"]) , userChat)

export default router;