import { afterEmbedding } from '../helpers/afterTransforming.js';
import handleMongoProjection from '../helpers/handleMongoProjection.js';
import paginateSort from '../helpers/paginateSort.js';
import { ChapterTransaction } from '../models/index.js';

const chapterTransactionService = {
  getAll: async (params = {}) => {
    try {
      params._fields = handleMongoProjection(params._fields, '-__v');
      const { _page, _limit, _sort, _fields, _embed, ...others } = params;

      if (_limit || _sort) {
        const response = await paginateSort(params, ChapterTransaction);

        if (response.data.length > 0) {
          return {
            ...response,
            data: afterEmbedding(response.data, _embed),
          };
        }

        return response;
      }

      const response = await ChapterTransaction.find(others).select(_fields).populate(_embed);
      return { data: afterEmbedding(response, _embed) };
    } catch (error) {
      throw new Error(error);
    }
  },
  add: async (
    userId = '',
    titleId = '',
    chapterId = '',
    expiredAt = null,
    method = '',
    cost = 0
  ) => {
    try {
      const model = new ChapterTransaction({
        user_id: userId,
        title_id: titleId,
        chapter_id: chapterId,
        expired_at: expiredAt,
        method,
        cost,
      });

      const response = await model.save();
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  delete: async (id) => {
    try {
      const response = await ChapterTransaction.findOneAndDelete({ _id: id });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default chapterTransactionService;
