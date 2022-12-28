import paginateSort from '../helpers/paginateSort.js';
import { ChapterTransaction } from '../models/index.js';

const chapterTransactionService = {
  getAll: async (params = {}) => {
    const { _limit, _sort, _order } = params;

    if (_limit || (_sort && _order)) {
      const response = await paginateSort(params, ChapterTransaction);
      return response;
    }

    const response = await ChapterTransaction.find(params).populate('chapter');
    return { data: response };
  },
  add: async (userId = '', chapterId = '', expiredAt = null, method = '', cost = 0) => {
    const model = new ChapterTransaction({
      user_id: userId,
      chapter_id: chapterId,
      expired_at: expiredAt,
      method,
      cost,
    });

    const response = await model.save();
    return response;
  },
  delete: async (id) => {
    const response = await ChapterTransaction.findOneAndDelete({ _id: id });
    return response;
  },
};

export default chapterTransactionService;
