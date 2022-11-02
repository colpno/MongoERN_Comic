import express from 'express';
import {
  addStatus,
  getStatus,
  deleteStatus,
  getStatuses,
  updateStatus,
} from '../controllers/status/index.js';

const router = express.Router();

router.post('/create', addStatus);
router.put('/:guid/update', updateStatus);
router.delete('/:guid/delete', deleteStatus);
router.get('/:guid', getStatus);
router.get('/', getStatuses);

export default router;
