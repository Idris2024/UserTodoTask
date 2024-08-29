import { Request, Response } from 'express';
import Todo from '../models/Todo';

interface AuthRequest extends Request {
  user?: any;
}

export const createTodo = async (req: AuthRequest, res: Response) => {
  const { title } = req.body;

  try {
    const newTodo = new Todo({
      user: req.user.id,
      title
    });

    const todo = await newTodo.save();
    res.json(todo);
  } catch (err : any) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const getTodos = async (req: AuthRequest, res: Response) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
  } catch (err : any) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const updateTodo = async (req: AuthRequest, res: Response) => {
  const { title, completed } = req.body;

  try {
    let todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found' });
    }

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: { title, completed } },
      { new: true }
    );

    res.json(todo);
  } catch (err : any) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const deleteTodo = async (req: AuthRequest, res: Response) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found' });
    }

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Todo.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Todo removed' });
  } catch (err : any) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};