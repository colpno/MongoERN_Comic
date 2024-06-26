import express from 'express';
import { approvedStatusController } from '../controllers/index.js';
import { isAdmin } from '../middlewares/authenticate.middleware.js';

const route = express.Router();

route.get('/', approvedStatusController.getAll);
route.get('/:id', approvedStatusController.getOne);
route.post('/create', isAdmin, approvedStatusController.add);
route.put('/update/:id', isAdmin, approvedStatusController.update);
route.delete('/delete', isAdmin, approvedStatusController.delete);

export default route;
