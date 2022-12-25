import express from 'express';
import readingHistoryController from '../controllers/readingHistory.controller.js';
import { isAuthenticated } from '../middlewares/authenticate.middleware.js';

const route = express.Router();

route.get('/', isAuthenticated, readingHistoryController.getAll);
route.post('/create', isAuthenticated, readingHistoryController.add);

export default route;
