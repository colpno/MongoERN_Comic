import express from 'express';
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/user/index.js';

const router = express.Router();

router.put('/:guid/update', updateUser);
router.delete('/:guid/delete', deleteUser);
router.get('/:guid', getUser);
router.get('/', getUsers);

export default router;
