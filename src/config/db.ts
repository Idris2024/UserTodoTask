import mongoose from 'mongoose';
const connectDB = async () => {
    try {
      await mongoose.connect('mongodb+srv://jamydeen11:e15Q0kp2r4Girp1r@cluster.mb5fewu.mongodb.net/jamal', {
      });
      console.log('MongoDB connected');
    } catch (err :any) {
      console.error(err.message);
      process.exit(1);
    }
  };
  
  export default connectDB;