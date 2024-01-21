import express from 'express';
import { paymentMethodController } from '../controllers/index.js';
import { isAdmin } from '../middlewares/authenticate.middleware.js';

const route = express.Router();

route.get('/', paymentMethodController.getAll);
route.post('/create', isAdmin, paymentMethodController.add);
route.put('/update/:id', isAdmin, paymentMethodController.update);
route.delete('/delete', isAdmin, paymentMethodController.delete);

export default route;
