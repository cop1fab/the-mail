import express from 'express';
import Passport from 'passport';
import Article from '../controllers/article';
// @router initialization
const router = express.Router();

router.post('/', Passport.authenticate('jwt', { session: false }), Article.create);
router.get('/', Passport.authenticate('jwt', { session: false }), Article.getAll);
router.get('/:id', Passport.authenticate('jwt', { session: false }), Article.getOne);
router.put('/:id', Passport.authenticate('jwt', { session: false }), Article.update);
router.delete('/:id', Passport.authenticate('jwt', { session: false }), Article.delete);

export default router;
