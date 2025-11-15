import express from 'express';
import {
  likesForMedia,
  likesForUser,
  postLike,
  deleteLike
} from '../controllers/likes-controller.js';

const likesRouter = express.Router();

likesRouter.get('/media/:id', likesForMedia);
likesRouter.get('/user/:id', likesForUser);
likesRouter.post('/', postLike);
likesRouter.delete('/:id', deleteLike);

export default likesRouter;
