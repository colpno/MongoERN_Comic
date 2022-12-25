import express from 'express';
import coinTransactionController from '../controllers/coinTransaction.controller.js';
import { isAuthenticated } from '../middlewares/authenticate.middleware.js';

const route = express.Router();

route.get('/', isAuthenticated, coinTransactionController.getAll);
route.post('/create', isAuthenticated, coinTransactionController.add);

export default route;
