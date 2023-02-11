import paginateSort from '../helpers/paginateSort.js';
import { Genre } from '../models/index.js';

const chapterService = {
  getAll: async (params = {}) => {
    params._fields = `-__v${params._fields ? ` ${params._fields}` : ''}`;
    const { _page, _limit, _sort, _order, _fields, ...others } = params;

    if (_limit || (_sort && _order)) {
      const response = await paginateSort(params, Genre);
      return response;
    }

    const response = await Genre.find(others).select(_fields);
    return { data: response };
  },
  getOne: async (params = {}) => {
    const response = await Genre.findOne(params);
    return response;
  },
  add: async (name = '') => {
    const model = new Genre({
      name,
    });

    const response = await model.save();
    return response;
  },
  update: async (id, data = {}) => {
    const response = await Genre.findOneAndUpdate({ _id: id }, data, { new: true });
    return response;
  },
  delete: async (id) => {
    const response = await Genre.findOneAndDelete({ _id: id });
    return response;
  },
};

export default chapterService;
