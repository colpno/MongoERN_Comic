import express from 'express';
import vnpayController from '../controllers/vnpay.controllers.js';
import { isAuthenticated } from '../middlewares/authenticate.middleware.js';

const route = express.Router();

route.get('/vnpay-payment', isAuthenticated, vnpayController.createPayment);
route.get('/vnpay-return', isAuthenticated, vnpayController.getPayment);

export default route;
