import paginateSort from '../helpers/paginateSort.js';
import { Chapter } from '../models/index.js';

const chapterService = {
  getAll: async (params = {}) => {
    const { _page, _limit, _sort, _order } = params;

    if ((_page && _limit) || (_sort && _order)) {
      const response = await paginateSort(params, Chapter);
      return response;
    }

    const response = await Chapter.find(params);
    return response;
  },
  getOne: async (params = {}) => {
    const response = await Chapter.findOne(params);
    return response;
  },
  add: async (
    titleId = '',
    approvedStatusId = '',
    title = '',
    cover = '',
    contents = '',
    order = 1,
    cost = false,
    cloudPublicId = ''
  ) => {
    const model = new Chapter({
      title_id: titleId,
      approved_status_id: approvedStatusId,
      title,
      cover,
      contents,
      order,
      cost,
      cloud_public_id: cloudPublicId,
    });

    const response = await model.save();
    return response;
  },
  update: async (id, data = {}) => {
    const response = await Chapter.findOneAndUpdate({ _id: id }, data, { new: true });
    return response;
  },
  delete: async (id) => {
    const response = await Chapter.findOneAndDelete({ _id: id });
    return response;
  },
};

export default chapterService;
