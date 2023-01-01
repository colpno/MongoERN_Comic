import express from 'express';
import { coinHistoryController } from '../controllers/index.js';
import { isAuthenticated } from '../middlewares/authenticate.middleware.js';

const route = express.Router();

route.get('/', isAuthenticated, coinHistoryController.getAll);

export default route;
