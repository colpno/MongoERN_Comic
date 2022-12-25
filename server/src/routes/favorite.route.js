import express from 'express';
import favoriteController from '../controllers/favorite.controller.js';
import { isAuthenticated } from '../middlewares/authenticate.middleware.js';

const favoriteRoute = express.Router();

favoriteRoute.get('/', isAuthenticated, favoriteController.getAll);
favoriteRoute.post('/create', isAuthenticated, favoriteController.add);
favoriteRoute.delete('/delete', isAuthenticated, favoriteController.delete);

export default favoriteRoute;
