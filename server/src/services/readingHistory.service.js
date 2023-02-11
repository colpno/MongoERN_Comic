import paginateSort from '../helpers/paginateSort.js';
import { ReadingHistory } from '../models/index.js';

const readingHistoryService = {
  getAll: async (params = {}) => {
    params._fields = `-__v${params._fields ? ` ${params._fields}` : ''}`;
    const { _page, _limit, _sort, _order, _fields, _embed, ...others } = params;

    if (_limit || (_sort && _order)) {
      const response = await paginateSort(params, ReadingHistory);
      return response;
    }

    const response = await ReadingHistory.find(others).select(_fields).populate(_embed);
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
  update: async (match = {}, data = {}) => {
    const response = await ReadingHistory.findOneAndUpdate(match, data, {
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
