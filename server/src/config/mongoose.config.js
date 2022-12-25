import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

export const mongooseConfig = () => {
  mongoose.set('strictQuery', false);
};
