import express from 'express';
import chapterController from '../controllers/chapter.controller.js';
import { isAuthenticated } from '../middlewares/authenticate.middleware.js';

const route = express.Router();

route.get('/', chapterController.getAll);
route.get('/:id', chapterController.getOne);
route.get('/owned', isAuthenticated, chapterController.getAll);
route.get('/owned/:id', isAuthenticated, chapterController.getOne);
route.post('/create', isAuthenticated, chapterController.add);
route.put('/update/view/:id', chapterController.updateView);
route.put('/update/:id', isAuthenticated, chapterController.update);
route.delete('/delete/:id', isAuthenticated, chapterController.delete);

export default route;
