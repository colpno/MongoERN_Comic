import express from 'express';
import {
  addGenre,
  deleteGenre,
  getGenre,
  getGenres,
  updateGenre,
} from '../controllers/genre/index.js';

const router = express.Router();

router.post('/create', addGenre);
router.put('/update/:guid', updateGenre);
router.delete('/delete/:guid', deleteGenre);
router.get('/:guid', getGenre);
router.get('/', getGenres);

export default router;
