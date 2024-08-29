import express from 'express';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import todoRoutes from './routes/todoRoutes';

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);

const PORT

 = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));