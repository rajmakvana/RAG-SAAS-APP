import {Router} from 'express';
import { deleteThread, getThreadMessages, getUserThreads, userChat } from '../controller/chat.controller.js';
import { authMiddleware , roleMiddleware} from '../middleware/authMiddleware.js';

const router = Router();

router.post('/message' , authMiddleware , roleMiddleware(["USER" , "ADMIN"]) , userChat)
router.get('/threads' , authMiddleware , roleMiddleware(["USER" , "ADMIN"]) , getUserThreads)
router.get('/threads/:threadId' , authMiddleware , roleMiddleware(["USER" , "ADMIN"]) , getThreadMessages)
router.delete('/threads/:threadId' , authMiddleware , roleMiddleware(["USER" , "ADMIN"]) , deleteThread)

export default router;