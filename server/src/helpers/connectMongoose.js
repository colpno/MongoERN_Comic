import mongoose from 'mongoose';
import { mongooseConfig } from '../config/mongoose.config.js';

const connectMongoose = () => {
  mongooseConfig();

  mongoose
    .connect(process.env.MONGOOSE_URL)
    .then(() => {
      console.log('Connected to mongoose database');
    })
    .catch((error) => {
      console.log('file: connectMongoose.js:13 ~ error', error);
    });
};

export default connectMongoose;
