import express from 'express';
import { objectStatusController } from '../controllers/index.js';
import { isAdmin } from '../middlewares/authenticate.middleware.js';

const route = express.Router();

route.get('/', objectStatusController.getAll);
route.get('/:id', objectStatusController.getOne);
route.post('/create', isAdmin, objectStatusController.add);
route.put('/update/:id', isAdmin, objectStatusController.update);
route.delete('/delete/:id', isAdmin, objectStatusController.delete);

export default route;
