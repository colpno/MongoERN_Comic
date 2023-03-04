import moment from 'moment';
import { Types } from 'mongoose';
import handleMongoProjection from '../helpers/handleMongoProjection.js';
import paginateSort from '../helpers/paginateSort.js';
import { ChapterReport } from '../models/index.js';
import { MAX_YEAR } from '../validations/index.js';

const chapterReportService = {
  getAll: async (params = {}) => {
    try {
      params._fields = handleMongoProjection(params._fields, '-__v');
      const { _page, _limit, _sort, _order, _fields, _embed, ...others } = params;

      if (_limit || (_sort && _order)) {
        const response = await paginateSort(params, ChapterReport);
        return response;
      }

      const response = await ChapterReport.find(others).select(_fields).populate(_embed);
      return { data: response };
    } catch (error) {
      throw new Error(error);
    }
  },
  getOne: async (chapterId = '', month = '', year = '') => {
    try {
      const response = await ChapterReport.findOne({
        chapter_id: Types.ObjectId(chapterId),
        month,
        year,
      }).select('-__v');
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  add: async (
    chapterId = '',
    month = moment().month() + 1,
    year = MAX_YEAR,
    like = 0,
    view = 0
  ) => {
    try {
      const model = new ChapterReport({
        chapter_id: chapterId,
        like,
        view,
        month,
        year,
      });

      const response = await model.save();
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  update: async (chapterId, month, year, view = 0, like = 0) => {
    try {
      const data = { $inc: {} };
      if (view !== 0) data.$inc.view = view;
      if (like !== 0) data.$inc.like = like;

      const response = await ChapterReport.findOneAndUpdate(
        { chapter_id: chapterId, month, year },
        data,
        { new: true }
      );

      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default chapterReportService;
