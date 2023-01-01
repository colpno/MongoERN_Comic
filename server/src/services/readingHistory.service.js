import paginateSort from '../helpers/paginateSort.js';
import { Chapter, ReadingHistory, Title } from '../models/index.js';

const getAttachData = async (response) => {
  const titleIds = response.data.map((history) => history.title_id);
  const chapterIds = response.data.map((history) => history.chapter_id);

  const titles = await Title.find({ _id: { $in: titleIds } });
  const chapters = await Chapter.find({ _id: { $in: chapterIds } });

  const histories = response.data.map((history) => {
    const title = titles.find((tit) => {
      const id = tit._id.toString();
      return id === history.title_id;
    });
    const chapter = chapters.find((chap) => {
      const id = chap._id.toString();
      return id === history.chapter_id;
    });
    return { history, title, chapter };
  });

  return histories;
};

const readingHistoryService = {
  getAll: async (params = {}) => {
    const { _limit, _sort, _order } = params;

    if (_limit || (_sort && _order)) {
      const response = await paginateSort(params, ReadingHistory);

      if (response.data.length > 0) {
        return { ...response, data: await getAttachData(response) };
      }

      return { data: response };
    }

    const response = await ReadingHistory.find(params);
    return { data: await getAttachData({ data: response }) };
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
