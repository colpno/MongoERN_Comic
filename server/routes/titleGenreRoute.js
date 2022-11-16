import express from 'express';
import {
  addTitleGenre,
  deleteTitleGenre,
  getTitleGenre,
  getTitlesGenres,
  updateTitleGenre,
} from '../controllers/titleGenre/index.js';

const router = express.Router();

router.post('/create', addTitleGenre);
router.put('/update/:guid', updateTitleGenre);
router.delete('/delete/:guid', deleteTitleGenre);
router.get('/:guid', getTitleGenre);
router.get('/', getTitlesGenres);

export default router;
