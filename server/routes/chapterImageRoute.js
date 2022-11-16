import express from 'express';
import {
  addChapterImage,
  deleteChapterImage,
  getChapterImages,
  updateChapterImage,
} from '../controllers/chapterImage/index.js';

const router = express.Router();

router.post('/create', addChapterImage);
router.put('/update/:guid', updateChapterImage);
router.delete('/delete/:guid', deleteChapterImage);
router.get('/', getChapterImages);

export default router;
