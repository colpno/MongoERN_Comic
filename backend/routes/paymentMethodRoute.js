import express from 'express';
import {
  addPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
  getPaymentMethod,
  getPaymentMethods,
} from '../controllers/paymentMethod/index.js';

const router = express.Router();

router.post('/create', addPaymentMethod);
router.put('/:guid/update', updatePaymentMethod);
router.delete('/:guid/delete', deletePaymentMethod);
router.get('/:guid', getPaymentMethod);
router.get('/', getPaymentMethods);

export default router;
