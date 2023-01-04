import moment from 'moment';
import { Types } from 'mongoose';
import paginateSort from '../helpers/paginateSort.js';
import { ChapterReport } from '../models/index.js';
import { MAX_YEAR } from '../validations/index.js';

const chapterReportService = {
  getAll: async (params = {}) => {
    const { _page, _limit, _sort, _order, fields, ...others } = params;

    if (others.chapter_id) others.chapter_id = Types.ObjectId(others.chapter_id);

    if (_limit || (_sort && _order)) {
      const response = await paginateSort(params, ChapterReport);
      return response;
    }

    const response = await ChapterReport.find(others).select(fields);
    return { data: response };
  },
  getOne: async (chapterId = '', month = '', year = '') => {
    const response = await ChapterReport.findOne({
      chapter_id: Types.ObjectId(chapterId),
      month,
      year,
    });
    return response;
  },
  add: async (
    chapterId = '',
    month = moment().month() + 1,
    year = MAX_YEAR,
    like = 0,
    view = 0
  ) => {
    const model = new ChapterReport({
      chapter_id: chapterId,
      like,
      view,
      month,
      year,
    });

    const response = await model.save();
    return response;
  },
  update: async (chapterId, month, year, view = 0, like = 0) => {
    const data = { $inc: {} };
    if (view !== 0) data.$inc.view = view;
    if (like !== 0) data.$inc.like = like;

    const response = await ChapterReport.findOneAndUpdate(
      { chapter_id: chapterId, month, year },
      data,
      { new: true }
    );

    return response;
  },
};

export default chapterReportService;
