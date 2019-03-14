import { Router } from "express";
import Comment from "../controllers/comment";

//@router initialization
const router = Router();

router.post('/articles/:articleId', Comment.create);

export default router;