import express from 'express';
import { paypalController } from '../controllers/index.js';
import { isAuthenticated } from '../middlewares/authenticate.middleware.js';

const route = express.Router();

route.post('/payment', isAuthenticated, paypalController.payment);
route.post('/payout', isAuthenticated, paypalController.payout);
route.get('/success', isAuthenticated, paypalController.success);
route.get('/cancel', isAuthenticated, paypalController.cancel);

export default route;
