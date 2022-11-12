import express from 'express';
import {
  addChapter,
  updateChapter,
  deleteChapter,
  getChapter,
  getChapters,
} from '../controllers/chapter/index.js';

const router = express.Router();

router.post('/create', addChapter);
router.put('/update/:guid', updateChapter);
router.delete('/delete/:guid', deleteChapter);
router.get('/:guid', getChapter);
router.get('/', getChapters);

export default router;
