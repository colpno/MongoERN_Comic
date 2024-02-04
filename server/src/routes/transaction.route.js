import express from 'express';
import { transactionController } from '../controllers/index.js';
import { isAdmin, isAuthenticated } from '../middlewares/authenticate.middleware.js';

const route = express.Router();

route.get('/', isAdmin, transactionController.getAll);
route.get('/owned', isAuthenticated, transactionController.getAllOwned);
route.post('/create', isAuthenticated, transactionController.add);

export default route;
