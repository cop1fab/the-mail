import express from 'express';
import Article from '../controllers/article';
import Comment from '../controllers/comment';
import Passport from 'passport';

// @router initialization
const router = express.Router();

router.post('/', Passport.authenticate('jwt', { session: false }), Article.create);
router.get('/', Passport.authenticate('jwt', { session: false }), Article.getAll);
router.get('/:id', Passport.authenticate('jwt', { session: false }), Article.getOne);
router.put('/:id', Passport.authenticate('jwt', { session: false }), Article.update);
router.delete('/:id', Passport.authenticate('jwt', { session: false }), Article.delete);
router.post('/:id_article/comments', Passport.authenticate('jwt', { session: false }), Comment.create);
router.get('/:id_article/comments', Comment.getAll);

export default router;
