import express from 'express';
import { notificationController } from '../controllers/index.js';
// eslint-disable-next-line no-unused-vars
import { isAdmin, isAuthenticated } from '../middlewares/authenticate.middleware.js';

const route = express.Router();

route.get('/', notificationController.getAll);
route.post('/create', notificationController.add);
route.put('/update/:id', notificationController.update);
route.delete('/delete', notificationController.delete);

export default route;
