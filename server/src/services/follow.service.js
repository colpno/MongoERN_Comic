import paginateSort from '../helpers/paginateSort.js';
import { Follow } from '../models/index.js';

const chapterService = {
  getAll: async (params = {}) => {
    const { _page, _limit, _sort, _order } = params;

    if ((_page && _limit) || (_sort && _order)) {
      const response = await paginateSort(params, Follow);
      return response;
    }

    const response = await Follow.find(params);
    return response;
  },
  add: async (userId = '', titleId = '') => {
    const model = new Follow({
      user_id: userId,
      title_id: titleId,
    });

    const response = await model.save();
    return response;
  },
  delete: async (userId, titleId) => {
    const response = await Follow.findOneAndDelete({ userId, titleId });
    return response;
  },
};

export default chapterService;
