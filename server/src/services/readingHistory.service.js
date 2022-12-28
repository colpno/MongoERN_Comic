import paginateSort from '../helpers/paginateSort.js';
import { ReadingHistory } from '../models/index.js';

const readingHistoryService = {
  getAll: async (params = {}) => {
    const { _limit, _sort, _order } = params;

    if (_limit || (_sort && _order)) {
      const response = await paginateSort(params, ReadingHistory);
      return response;
    }

    const response = await ReadingHistory.find(params);
    return { data: response };
  },
  add: async (userId = '', titleId = '', chapterId = '') => {
    const model = new ReadingHistory({
      user_id: userId,
      title_id: titleId,
      chapter_id: chapterId,
    });

    const response = await model.save();
    return response;
  },
  update: async (userId, titleId, data = {}) => {
    const response = await ReadingHistory.findOneAndUpdate({ userId, titleId }, data, {
      new: true,
    });
    return response;
  },
  delete: async (id) => {
    const response = await ReadingHistory.findOneAndDelete({ _id: id });
    return response;
  },
};

export default readingHistoryService;
