import express from 'express';
import { incomeController } from '../controllers/index.js';
import { isAdmin } from '../middlewares/authenticate.middleware.js';

const route = express.Router();

route.get('/', isAdmin, incomeController.getAll);

export default route;
