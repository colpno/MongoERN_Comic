import express from 'express';
import {
  addApprovedStatus,
  deleteApprovedStatus,
  getApprovedStatus,
  getApprovedStatuses,
  updateApprovedStatus,
} from '../controllers/approvedStatus/index.js';

const router = express.Router();

router.post('/create', addApprovedStatus);
router.put('/update/:guid', updateApprovedStatus);
router.delete('/delete/:guid', deleteApprovedStatus);
router.get('/:guid', getApprovedStatus);
router.get('/', getApprovedStatuses);

export default router;
