import express from 'express';
import { chapterTransactionController } from '../controllers/index.js';
import { isAdmin, isAuthenticated } from '../middlewares/authenticate.middleware.js';

const route = express.Router();

route.get('/', isAdmin, chapterTransactionController.getAll);
route.get('/owned', isAuthenticated, chapterTransactionController.getAllOwned);
route.post('/create', isAuthenticated, chapterTransactionController.add);

export default route;
