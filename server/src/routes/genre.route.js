import express from 'express';
import genreController from '../controllers/genre.controller.js';
import { isAdmin } from '../middlewares/authenticate.middleware.js';

const route = express.Router();

route.get('/', genreController.getAll);
route.get('/:id', genreController.getOne);
route.post('/create', isAdmin, genreController.add);
route.put('/update/:id', isAdmin, genreController.update);
route.delete('/delete/:id', isAdmin, genreController.delete);

export default route;
