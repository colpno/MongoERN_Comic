import express from 'express';
import { addReadingHistory, getReadingHistories } from '../controllers/readingHistory/index.js';

const router = express.Router();

router.post('/create', addReadingHistory);
router.get('/', getReadingHistories);

export default router;
