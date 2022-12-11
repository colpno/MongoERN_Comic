import express from 'express';
import { getTitleReports } from '../controllers/titleReport/index.js';

const router = express.Router();

router.get('/', getTitleReports);

export default router;
