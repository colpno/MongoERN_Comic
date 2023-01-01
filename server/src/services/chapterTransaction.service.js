import paginateSort from '../helpers/paginateSort.js';
import { Chapter, ChapterTransaction, Title } from '../models/index.js';

const getAttachData = async (response) => {
  const titleIds = response.data.map((transaction) => transaction.title_id);
  const chapterIds = response.data.map((transaction) => transaction.chapter_id);

  const titles = await Title.find({ _id: { $in: titleIds } });
  const chapters = await Chapter.find({ _id: { $in: chapterIds } });

  const transactions = response.data.map((transaction) => {
    const title = titles.find((tit) => {
      const id = tit._id.toString();
      return id === transaction.title_id;
    });
    const chapter = chapters.find((chap) => {
      const id = chap._id.toString();
      return id === transaction.chapter_id;
    });
    return { transaction, title, chapter };
  });

  return transactions;
};

const chapterTransactionService = {
  getAll: async (params = {}) => {
    const { _limit, _sort, _order } = params;

    if (_limit || (_sort && _order)) {
      const response = await paginateSort(params, ChapterTransaction);

      if (response.data.length > 0) {
        return { ...response, data: await getAttachData(response) };
      }

      return response;
    }

    const response = await ChapterTransaction.find(params);
    return { data: await getAttachData({ data: response }) };
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
    const final = await getAttachData({ data: [response] });
    return final[0];
  },
  delete: async (id) => {
    const response = await ChapterTransaction.findOneAndDelete({ _id: id });
    return response;
  },
};

export default chapterTransactionService;
