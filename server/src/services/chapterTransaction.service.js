import paginateSort from '../helpers/paginateSort.js';
import { ChapterTransaction } from '../models/index.js';

const chapterTransactionService = {
  getAll: async (params = {}) => {
    params._fields = `-__v${params._fields ? ` ${params._fields}` : ''}`;
    const { _page, _limit, _sort, _order, _fields, _embed, ...others } = params;

    if (_limit || (_sort && _order)) {
      const response = await paginateSort(params, ChapterTransaction);

      if (response.data.length > 0) {
        return { ...response };
      }

      return response;
    }

    const response = await ChapterTransaction.find(others).select(_fields).populate(_embed);
    return { data: response };
  },
  add: async (
    userId = '',
    titleId = '',
    chapterId = '',
    expiredAt = null,
    method = '',
    cost = 0
  ) => {
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
  },
  delete: async (id) => {
    const response = await ChapterTransaction.findOneAndDelete({ _id: id });
    return response;
  },
};

export default chapterTransactionService;
