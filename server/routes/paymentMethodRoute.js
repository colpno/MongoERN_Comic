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
router.put('/update/:guid', updatePaymentMethod);
router.delete('/delete/:guid', deletePaymentMethod);
router.get('/:guid', getPaymentMethod);
router.get('/', getPaymentMethods);

export default router;
