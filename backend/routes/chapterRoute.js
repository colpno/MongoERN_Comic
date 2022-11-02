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
router.put('/:guid/update', updateChapter);
router.delete('/:guid/delete', deleteChapter);
router.get('/:guid', getChapter);
router.get('/', getChapters);

export default router;
