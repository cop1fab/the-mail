import { Router } from "express";
import Comment from "../controllers/comment";
import Passport from 'passport';

const router = Router();

router.delete('/:id', Passport.authenticate('jwt', { session: false }), Comment.delete);

export default router;
