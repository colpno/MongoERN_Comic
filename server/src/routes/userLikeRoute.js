import express from 'express';
import { addUserLike, deleteUserLike, getUserLike } from '../controllers/userLike/index.js';

const userLikeRoute = express.Router();

userLikeRoute.post('/create', addUserLike);
userLikeRoute.delete('/delete', deleteUserLike);
userLikeRoute.get('/', getUserLike);

export default userLikeRoute;
