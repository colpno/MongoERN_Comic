import paginateSort from '../helpers/paginateSort.js';
import { ApprovedStatus } from '../models/index.js';

const approvedStatusService = {
  getAll: async (params = {}) => {
    const { _page, _limit, _sort, _order } = params;

    if ((_page && _limit) || (_sort && _order)) {
      const response = await paginateSort(params, ApprovedStatus);
      return response;
    }

    const response = await ApprovedStatus.find(params);
    return response;
  },
  getOne: async (params = {}) => {
    const response = await ApprovedStatus.findOne(params);
    return response;
  },
  add: async (status = '') => {
    const model = new ApprovedStatus({ status });

    const response = await model.save();
    return response;
  },
  update: async (id, data) => {
    const response = await ApprovedStatus.findOneAndUpdate({ _id: id }, data, { new: true });
    return response;
  },
  delete: async (id) => {
    const response = await ApprovedStatus.findOneAndDelete({ _id: id });
    return response;
  },
};

export default approvedStatusService;
