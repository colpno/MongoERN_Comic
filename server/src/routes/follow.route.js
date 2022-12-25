import express from 'express';
import followController from '../controllers/follow.controller.js';
import { isAuthenticated } from '../middlewares/authenticate.middleware.js';

const route = express.Router();

route.get('/', isAuthenticated, followController.getAll);
route.post('/create', isAuthenticated, followController.add);
route.delete('/delete', isAuthenticated, followController.delete);

export default route;
