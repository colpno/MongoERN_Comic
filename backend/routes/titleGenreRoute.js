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
router.put('/:guid/update', updateTitleGenre);
router.delete('/:guid/delete', deleteTitleGenre);
router.get('/:guid', getTitleGenre);
router.get('/', getTitlesGenres);

export default router;
