import { Schema, model, Document, Types } from 'mongoose';

interface ITodo extends Document {
  user: Types.ObjectId
  title: string;
  completed: boolean;
}

const todoSchema = new Schema<ITodo>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const Todo = model<ITodo>('Todo', todoSchema);

export default Todo;