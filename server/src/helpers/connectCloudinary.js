import { v2 as cloudinaryv2 } from 'cloudinary';

import cloudinaryConfig from '../config/cloudinary.config.js';

cloudinaryv2.config(cloudinaryConfig);

export { cloudinaryv2 as cloudinary };
