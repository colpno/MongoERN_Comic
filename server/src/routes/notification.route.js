import express from 'express';
import { notificationController } from '../controllers/index.js';
import { isAdmin } from '../middlewares/authenticate.middleware.js';

const route = express.Router();

route.get('/', notificationController.getAll);
route.get('/:id', notificationController.getOne);
route.post('/create', isAdmin, notificationController.add);
route.put('/update/:id', isAdmin, notificationController.update);
route.delete('/delete', isAdmin, notificationController.delete);

export default route;
