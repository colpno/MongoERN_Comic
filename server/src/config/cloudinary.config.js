import { config } from 'dotenv';
import { v2 as cloudinaryv2 } from 'cloudinary';

config();

const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

cloudinaryv2.config(cloudinaryConfig);

export { cloudinaryv2 as cloudinary };
