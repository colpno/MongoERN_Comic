import express from 'express';
import { userController } from '../controllers/index.js';
import { isAdmin, isAuthenticated } from '../middlewares/authenticate.middleware.js';

const route = express.Router();

route.get('/', isAdmin, userController.getAll);
route.get('/profile', isAuthenticated, userController.getOne);
route.post('/register', userController.register);
route.put('/update/:id', isAuthenticated, userController.update);
route.delete('/delete/:id', isAuthenticated, userController.delete);

export default route;
