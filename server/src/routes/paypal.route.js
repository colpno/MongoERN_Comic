import express from 'express';
import { paypalController } from '../controllers/index.js';
import { isAuthenticated } from '../middlewares/authenticate.middleware.js';

const route = express.Router();

route.post('/order', isAuthenticated, paypalController.order);
route.post('/capture', isAuthenticated, paypalController.capture);

export default route;
