import express from 'express';
import createPayment from '../controllers/charge/createPayment.js';
import getPayment from '../controllers/charge/getPayment.js';

const router = express.Router();

router.get('/vnpay-payment', createPayment);
router.get('/vnpay-return', getPayment);

export default router;
