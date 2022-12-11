import express from 'express';
import {
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
  sendOTP,
  verifyAccount,
  verifyLoginOTP,
} from '../controllers/auth/index.js';

const router = express.Router();

router.post('/login', login);
router.post('/login/verify', verifyLoginOTP);
router.post('/login/verify/re-send', sendOTP);
router.post('/register', register);
router.post('/register/verify', verifyAccount);
router.get('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

export default router;
