import express from 'express';
import multer from 'multer'; 
import {
  getMedia,
  getMediaById,
  postMedia,
  putMedia,
  deleteMedia
} from '../controllers/media-controller.js';

const mediaRouter = express.Router();
const upload = multer({ dest: process.env.UPLOADS_PATH });

mediaRouter
  .route('/')
  .get(getMedia)
  .post(upload.single('file'), postMedia);

mediaRouter
  .route('/:id')
  .get(getMediaById)
  .put(putMedia)         
  .delete(deleteMedia);   

export default mediaRouter;
