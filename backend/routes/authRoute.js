import { login, logout, register } from '../controllers/auth/index.js';
import express from 'express';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/logout', logout);

export default router;
