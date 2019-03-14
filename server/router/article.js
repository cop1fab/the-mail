import express from 'express';
import Article from '../controllers/article';
// @router initialization
const router = express.Router();

router.post('/', Article.create);
router.get('/', Article.getAll);
router.get('/:id', Article.getOne);

export default router;
