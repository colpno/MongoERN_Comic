import express from 'express';
import {
  addChapterTransaction,
  deleteChapterTransaction,
  getChapterTransaction,
  getChapterTransactions,
  updateChapterTransaction,
} from '../controllers/chapterTransaction/index.js';

const router = express.Router();

router.post('/create', addChapterTransaction);
router.put('/update/:guid', updateChapterTransaction);
router.delete('/delete/:guid', deleteChapterTransaction);
router.get('/:guid', getChapterTransaction);
router.get('/', getChapterTransactions);

export default router;
