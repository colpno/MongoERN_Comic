import express from 'express';
import { personalNotificationController } from '../controllers/index.js';
import { isAdmin, isAuthenticated } from '../middlewares/authenticate.middleware.js';

const route = express.Router();

route.get('/', isAuthenticated, personalNotificationController.getAll);
route.post('/create', isAdmin, personalNotificationController.add);
route.put('/update/:id', isAuthenticated, personalNotificationController.update);
route.delete('/delete', isAuthenticated, personalNotificationController.delete);

export default route;
