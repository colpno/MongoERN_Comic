import express from 'express';
import { transactionController } from '../controllers/index.js';
import { isAuthenticated } from '../middlewares/authenticate.middleware.js';

const route = express.Router();

route.get('/', isAuthenticated, transactionController.getAll);
route.post('/create', isAuthenticated, transactionController.add);

export default route;
