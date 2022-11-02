import express from 'express';
import {
  addCoinTransaction,
  deleteCoinTransaction,
  getCoinTransaction,
  getCoinTransactions,
  updateCoinTransaction,
} from '../controllers/coinTransaction/index.js';

const router = express.Router();

router.post('/create', addCoinTransaction);
router.put('/:guid/update', updateCoinTransaction);
router.delete('/:guid/delete', deleteCoinTransaction);
router.get('/:guid', getCoinTransaction);
router.get('/', getCoinTransactions);

export default router;
