import express from 'express';
import { titleController } from '../controllers/index.js';
import { isAuthenticated } from '../middlewares/authenticate.middleware.js';

const route = express.Router();

route.get('/', titleController.getAll);
route.get('/random', titleController.random);
route.get('/owned', isAuthenticated, titleController.getAll);
route.get('/owned/:id', isAuthenticated, titleController.getOne);
route.post('/create', isAuthenticated, titleController.add);
route.put('/update/:id', isAuthenticated, titleController.update);
route.delete('/delete/:id', isAuthenticated, titleController.delete);
route.get('/:id', titleController.getOne);

export default route;
