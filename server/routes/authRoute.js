import {
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
} from '../controllers/auth/index.js';
import express from 'express';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

export default router;
