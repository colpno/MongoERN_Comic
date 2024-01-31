import handleMongoProjection from '../helpers/handleMongoProjection.js';
import paginateSort from '../helpers/paginateSort.js';
import { Follow } from '../models/index.js';

const followService = {
  getAll: async (params = {}) => {
    try {
      params._fields = handleMongoProjection(params._fields, '-__v');
      const { _page, _limit, _sort, _fields, _embed, ...others } = params;

      if (_limit || _sort) {
        const response = await paginateSort(params, Follow);
        return response;
      }

      const response = await Follow.find(others).select(_fields).populate(_embed);
      return { data: response };
    } catch (error) {
      throw new Error(error);
    }
  },
  add: async (userId = '', titleId = '') => {
    try {
      const model = new Follow({
        user_id: userId,
        title_id: titleId,
      });

      const response = await model.save();
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  delete: async (filter) => {
    try {
      const response = await Follow.deleteMany(filter);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default followService;
