import express from 'express';
import { getAllUsers,deleteUser } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', getAllUsers);
router.delete('/:id', deleteUser);

export default router;
