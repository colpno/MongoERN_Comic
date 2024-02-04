import { afterEmbedding } from '../helpers/afterTransforming.js';
import handleMongoProjection from '../helpers/handleMongoProjection.js';
import paginateSort from '../helpers/paginateSort.js';
import { Notification } from '../models/index.js';
import cloudinaryService from './cloudinary.service.js';

const notificationService = {
  getAll: async (params = {}) => {
    try {
      params._fields = handleMongoProjection(params._fields, '-__v');
      const { _page, _limit, _sort, _fields, _embed, ...others } = params;

      if (_limit || _sort) {
        const response = await paginateSort(params, Notification);
        return {
          ...response,
          data: afterEmbedding(response.data, _embed),
        };
      }

      const response = await Notification.find(others).select(_fields).populate(_embed);
      return { data: afterEmbedding(response, _embed) };
    } catch (error) {
      throw new Error(error);
    }
  },
  getOne: async (params = {}) => {
    try {
      params._fields = handleMongoProjection(params._fields, '-__v');
      const { _page, _limit, _sort, _fields, _embed, ...others } = params;

      if (_limit || _sort) {
        const response = await paginateSort(params, Notification);
        return response;
      }

      const response = await Notification.findOne(others).select(_fields).populate(_embed);
      return { data: response };
    } catch (error) {
      throw new Error(error);
    }
  },
  add: async (cover, title, subTitle, content) => {
    try {
      const model = new Notification({
        cover: {
          source: cover,
          cloud_public_id: null,
        },
        title,
        subTitle,
        content,
      });

      const createResponse = await model.save();
      const { _id, __v, createdAt, updatedAt, ...incompleteData } = createResponse.toObject();

      const cloudResponse = await notificationService.uploadToCloud(cover, _id);

      const completeData = {
        ...incompleteData,
        cover: cloudResponse,
      };

      const response = await Notification.findOneAndUpdate({ _id }, completeData, {
        new: true,
      });

      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  update: async (match, data) => {
    try {
      if (data.cover) {
        await notificationService.removeFromCloud(match._id);
        const cloudResponse = await notificationService.uploadToCloud(data.cover, match._id);

        data.cover = cloudResponse;
      }

      const response = await Notification.findOneAndUpdate(match, data, {
        new: true,
      });

      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  delete: async (filter) => {
    try {
      const response = await Notification.deleteMany(filter);

      if (filter._id?.$in?.length > 0) {
        // eslint-disable-next-line no-restricted-syntax
        for await (const id of filter._id.$in) {
          notificationService.removeFromCloud(id);
        }
      }

      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  uploadToCloud: async (cover, notificationID) => {
    try {
      const cloudOptions = {
        upload_preset: process.env.CLOUDINARY_NOTIFICATION_UPLOAD_PRESET,
        folder: `comic/notifications/${notificationID}/cover`,
      };

      const finalCover = cover ? await cloudinaryService.upload(cover, cloudOptions) : undefined;

      return finalCover;
    } catch (error) {
      throw new Error(error);
    }
  },
  removeFromCloud: async (notificationID) => {
    try {
      await cloudinaryService.removeFolder(`comic/notifications/${notificationID}`);
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default notificationService;
