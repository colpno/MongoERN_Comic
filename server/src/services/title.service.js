import { afterEmbedding } from '../helpers/afterTransforming.js';
import handleMongoProjection from '../helpers/handleMongoProjection.js';
import paginateSort from '../helpers/paginateSort.js';
import { Title } from '../models/index.js';
import cloudinaryService from './cloudinary.service.js';
import objectStatusService from './objectStatus.service.js';

const cloudOptions = (id, path = '') => ({
  upload_preset: process.env.CLOUDINARY_TITLE_UPLOAD_PRESET,
  folder: `comic/titles/${id}/${path}`,
});

const titleService = {
  getAll: async (params = {}) => {
    try {
      params._fields = handleMongoProjection(params._fields, '-__v -_guid -cover.cloud_public_id');
      const { _page, _limit, _sort, _fields, _embed, ...others } = params;

      if (_limit || _sort) {
        const response = await paginateSort(params, Title);
        return {
          ...response,
          data: afterEmbedding(response.data, _embed),
        };
      }

      const response = await Title.find(others).select(_fields).populate(_embed);
      return { data: afterEmbedding(response, _embed) };
    } catch (error) {
      throw new Error(error);
    }
  },
  getOne: async (params = {}) => {
    try {
      params._fields = handleMongoProjection(params._fields, '-__v -_guid -cover.cloud_public_id');
      const { _fields, _embed, ...others } = params;

      const response = await Title.findOne(others).select(_fields).populate(_embed);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  random: async (params = {}) => {
    try {
      const { _limit, ...others } = params;

      const response = await Title.aggregate([{ $match: others }, { $sample: { size: +_limit } }]);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  add: async (
    userId = '',
    release_day = '',
    title = '',
    status_id = '',
    cover = {},
    author = '',
    summary = '',
    genres = [],
    coin = 0,
    point = 0,
    guid = ''
  ) => {
    try {
      const visibilityStatus = await objectStatusService.getOne({ code: status_id });

      const model = new Title({
        user_id: userId,
        release_day,
        title,
        status_id: visibilityStatus._id,
        cover,
        author,
        summary,
        genres,
        coin,
        point,
        _guid: guid,
      });

      const response = await model.save();
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  update: async (id, data = {}) => {
    try {
      const response = await Title.findOneAndUpdate({ _id: id }, data, { new: true });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  increaseCommentNum: async (id) => {
    try {
      const response = await Title.findOneAndUpdate(
        { _id: id },
        { $inc: { comment_num: 1 } },
        {
          new: true,
          timestamps: false,
        }
      );
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  increaseView: async (id) => {
    try {
      const response = await Title.findOneAndUpdate(
        { _id: id },
        { $inc: { view: 1 } },
        { new: true, timestamps: false }
      );
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  increaseLike: async (id, value = 1) => {
    try {
      const response = await Title.findOneAndUpdate(
        { _id: id },
        { $inc: { like: value } },
        { new: true, timestamps: false }
      );
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  delete: async (id) => {
    try {
      const response = await Title.findOneAndDelete({ _id: id });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  uploadToCloud: async (cover, titleGuid) => {
    try {
      const finalCover = cover
        ? await cloudinaryService.upload(cover, cloudOptions(titleGuid, 'cover'))
        : undefined;

      return finalCover;
    } catch (error) {
      throw new Error(error);
    }
  },
  removeFromCloud: async (publicId) => {
    try {
      await cloudinaryService.remove(publicId);
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default titleService;
