import handleMongoProjection from '../helpers/handleMongoProjection.js';
import paginateSort from '../helpers/paginateSort.js';
import { ReadingHistory } from '../models/index.js';

const readingHistoryService = {
  getAll: async (params = {}) => {
    try {
      params._fields = handleMongoProjection(params._fields, '-__v');
      const { _page, _limit, _sort, _fields, _embed, ...others } = params;

      if (_limit || _sort) {
        const response = await paginateSort(params, ReadingHistory);
        return response;
      }

      const response = await ReadingHistory.find(others).select(_fields).populate(_embed);
      return { data: response };
    } catch (error) {
      throw new Error(error);
    }
  },
  add: async (userId = '', titleId = '', chapterId = '') => {
    try {
      const model = new ReadingHistory({
        user_id: userId,
        title_id: titleId,
        chapter_id: chapterId,
      });

      const response = await model.save();
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  update: async (match = {}, data = {}) => {
    try {
      const response = await ReadingHistory.findOneAndUpdate(match, data, {
        new: true,
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  delete: async (id) => {
    try {
      const response = await ReadingHistory.findOneAndDelete({ _id: id });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default readingHistoryService;
