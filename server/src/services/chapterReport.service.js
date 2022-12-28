import paginateSort from '../helpers/paginateSort.js';
import { ChapterReport } from '../models/index.js';
import { MIN_MONTH, MAX_YEAR } from '../validations/index.js';

const chapterReportService = {
  getAll: async (params = {}) => {
    const { _page, _limit, _sort, _order } = params;

    if (_limit || (_sort && _order)) {
      const response = await paginateSort(params, ChapterReport);
      return response;
    }

    const response = await ChapterReport.find(params);
    return { data: response };
  },
  getOne: async (chapterId, month, year) => {
    const response = await ChapterReport.findOne({ chapter_id: chapterId, month, year });
    return response;
  },
  add: async (chapterId = '', likes = 0, views = 0, month = MIN_MONTH, year = MAX_YEAR) => {
    const model = new ChapterReport({
      chapter_id: chapterId,
      likes,
      views,
      month,
      year,
    });

    const response = await model.save();
    return response;
  },
  update: async (chapterId, month, year, type = 'views' || 'likes', value = 1) => {
    const response = await ChapterReport.findOneAndUpdate(
      { chapter_id: chapterId, month, year },
      { $inc: { [type]: value } },
      { new: true }
    );

    return response;
  },
};

export default chapterReportService;
