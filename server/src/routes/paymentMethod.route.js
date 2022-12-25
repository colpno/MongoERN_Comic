import express from 'express';
import paymentMethodController from '../controllers/paymentMethod.controller.js';
import { isAdmin } from '../middlewares/authenticate.middleware.js';

const route = express.Router();

route.get('/', paymentMethodController.getAll);
route.post('/create', isAdmin, paymentMethodController.add);
route.put('/update/:id', isAdmin, paymentMethodController.update);
route.delete('/delete/:id', isAdmin, paymentMethodController.delete);

export default route;
