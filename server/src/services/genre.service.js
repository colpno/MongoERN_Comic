import handleMongoProjection from '../helpers/handleMongoProjection.js';
import paginateSort from '../helpers/paginateSort.js';
import { Genre } from '../models/index.js';

const chapterService = {
  getAll: async (params = {}) => {
    try {
      params._fields = handleMongoProjection(params._fields, '-__v');
      const { _page, _limit, _sort, _order, _fields, ...others } = params;

      if (_limit || (_sort && _order)) {
        const response = await paginateSort(params, Genre);
        return response;
      }

      const response = await Genre.find(others).select(_fields);
      return { data: response };
    } catch (error) {
      throw new Error(error);
    }
  },
  getOne: async (params = {}) => {
    try {
      params._fields = handleMongoProjection(params._fields, '-__v');
      const { _fields, _embed, ...others } = params;

      const response = await Genre.findOne(others).select(_fields).populate(_embed);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  add: async (name = '') => {
    try {
      const model = new Genre({
        name,
      });

      const response = await model.save();
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  update: async (id, data = {}) => {
    try {
      const response = await Genre.findOneAndUpdate({ _id: id }, data, { new: true });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  delete: async (id) => {
    try {
      const response = await Genre.findOneAndDelete({ _id: id });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default chapterService;
