import express from 'express';
import Article from '../controllers/article';
// @router initialization
const router = express.Router();

router.post('/', Article.create);

export default router;
