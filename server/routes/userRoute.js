import express from 'express';
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/user/index.js';

const router = express.Router();

router.put('/update/:guid', updateUser);
router.delete('/delete/:guid', deleteUser);
router.get('/:guid', getUser);
router.get('/', getUsers);

export default router;
