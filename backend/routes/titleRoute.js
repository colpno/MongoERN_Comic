import express from 'express';
import {
  addTitle,
  deleteTitle,
  getTitle,
  getTitles,
  updateTitle,
} from '../controllers/title/index.js';

const router = express.Router();

router.post('/create', addTitle);
router.put('/update/:guid', updateTitle);
router.delete('/delete/:guid', deleteTitle);
router.get('/:guid', getTitle);
router.get('/', getTitles);

export default router;
