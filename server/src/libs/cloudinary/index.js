import { config } from 'dotenv';
import { v2 as cloudinaryv2 } from 'cloudinary';

config();

cloudinaryv2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinaryv2 as cloudinary };
