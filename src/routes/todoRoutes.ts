import express from 'express';
import auth from '../middleware/auth';
import { createTodo, getTodos, updateTodo, deleteTodo } from '../controllers/todoController';

const router = express.Router();

router.post('/', auth, createTodo);
router.get('/', auth, getTodos);
router.put('/:id', auth, updateTodo);
router.delete('/:id', auth, deleteTodo);

export default router;