import express from 'express';
import { commentController } from '../controllers/index.js';
import { isAuthenticated } from '../middlewares/authenticate.middleware.js';

const route = express.Router();

route.get('/', commentController.getAll);
route.post('/add', isAuthenticated, commentController.add);
route.put('/update/:id', isAuthenticated, commentController.update);

export default route;
