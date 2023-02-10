import paginateSort from '../helpers/paginateSort.js';
import { ObjectStatus } from '../models/index.js';

const objectStatusService = {
  getAll: async (params = {}) => {
    const { _page, _limit, _sort, _order, _fields, ...others } = params;

    if (_limit || (_sort && _order)) {
      const response = await paginateSort(params, ObjectStatus);
      return response;
    }

    const response = await ObjectStatus.find(others).select(_fields);
    return { data: response };
  },
  getOne: async (params = {}) => {
    const response = await ObjectStatus.findOne(params);
    return response;
  },
  add: async (status = '') => {
    const model = new ObjectStatus({ status });

    const response = await model.save();
    return response;
  },
  update: async (id, data) => {
    const response = await ObjectStatus.findOneAndUpdate({ _id: id }, data, { new: true });
    return response;
  },
  delete: async (id) => {
    const response = await ObjectStatus.findOneAndDelete({ _id: id });
    return response;
  },
};

export default objectStatusService;
