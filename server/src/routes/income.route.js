import express from 'express';
import { incomeController } from '../controllers/index.js';
import { isAuthenticated } from '../middlewares/authenticate.middleware.js';

const route = express.Router();

route.get('/', isAuthenticated, incomeController.getAll);

export default route;
