import express from 'express';
import { chapterTransactionController } from '../controllers/index.js';
import { isAuthenticated } from '../middlewares/authenticate.middleware.js';

const route = express.Router();

route.get('/', isAuthenticated, chapterTransactionController.getAll);
route.post('/create', isAuthenticated, chapterTransactionController.add);

export default route;
