import express from 'express';
import { addFollow, deleteFollow, getFollow, getFollows } from '../controllers/follow/index.js';

const router = express.Router();

router.post('/create', addFollow);
router.delete('/delete/:guid', deleteFollow);
router.get('/:guid', getFollow);
router.get('/', getFollows);

export default router;