import express from 'express';
import authController from '../controllers/auth.controller.js';
import { isAuthenticated } from '../middlewares/authenticate.middleware.js';

const route = express.Router();

route.put('/register/verify/:token', authController.verifyRegister);
route.post('/login', authController.login);
route.post('/login/verify', authController.verifyLogin);
route.post('/login/verify/re-send', authController.sendOTP);
route.get('/logout', isAuthenticated, authController.logout);
route.post('/forgot-password', authController.forgotPassword);
route.put('/reset-password/:token', authController.resetPassword);

export default route;
