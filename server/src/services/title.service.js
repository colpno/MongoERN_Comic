import handleMongoProjection from '../helpers/handleMongoProjection.js';
import paginateSort from '../helpers/paginateSort.js';
import { Title } from '../models/index.js';
import cloudinaryService from './cloudinary.service.js';

const cloudOptions = (id, path = '') => ({
  upload_preset: process.env.CLOUDINARY_TITLE_UPLOAD_PRESET,
  folder: `comic/titles/${id}/${path}`,
});

const titleService = {
  getAll: async (params = {}) => {
    try {
      params._fields = handleMongoProjection(params._fields, '-__v -_guid -cover.cloud_public_id');
      const { _page, _limit, _sort, _order, _fields, _embed, ...others } = params;

      if (_limit || (_sort && _order)) {
        const response = await paginateSort(params, Title);
        return response;
      }

      const response = await Title.find(others).select(_fields).populate(_embed);
      return { data: response };
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
  random: async (count, params = {}) => {
    try {
      const response = await Title.aggregate([{ $match: params }, { $sample: { size: +count } }]);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  add: async (
    userId = '',
    releaseDay = '',
    title = '',
    status = '',
    cover = {},
    author = '',
    summary = '',
    genres = [],
    coin = 0,
    point = 0,
    guid = ''
  ) => {
    try {
      const model = new Title({
        user_id: userId,
        release_day: releaseDay,
        title,
        status,
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
