import { cloudinary } from '../helpers/connectCloudinary.js';
import convertImageObject from '../helpers/convertImageObject.js';

const option = {
  upload_preset: '',
  folder: '',
};

const cloudinaryService = {
  upload: async (file = '', options = option) => {
    try {
      const response = await cloudinary.uploader.upload(file, options);

      console.log('Uploaded to cloud');

      const { secure_url: secureUrl, public_id: publicId } = response;
      const converted = convertImageObject(secureUrl, publicId);

      return converted;
    } catch (error) {
      throw new Error(error.error.message);
    }
  },
  removeFolder: async (path = '') => {
    try {
      // remove all resources in folder
      await cloudinary.api.delete_resources_by_prefix(path);

      // remove folder
      await cloudinary.api.delete_folder(path);

      console.log('Deleted from cloud');
    } catch (error) {
      throw new Error(error.error.message);
    }
  },
  remove: async (publicId = '' || ['']) => {
    try {
      await cloudinary.api.delete_resources(publicId);

      console.log('Deleted from cloud');
    } catch (error) {
      throw new Error(error.error.message);
    }
  },
};

export default cloudinaryService;
