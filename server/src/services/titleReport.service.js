import moment from 'moment';
import handleMongoProjection from '../helpers/handleMongoProjection.js';
import paginateSort from '../helpers/paginateSort.js';
import { TitleReport } from '../models/index.js';
import { MAX_YEAR } from '../validations/index.js';

const titleReportService = {
  getAll: async (params = {}) => {
    try {
      params._fields = handleMongoProjection(params._fields, '-__v');
      const { _page, _limit, _sort, _order, _fields, _embed, ...others } = params;

      if (_limit || (_sort && _order)) {
        const response = await paginateSort(params, TitleReport);
        return response;
      }

      const response = await TitleReport.find(others).select(_fields).populate(_embed);
      return { data: response };
    } catch (error) {
      throw new Error(error);
    }
  },
  getOne: async (titleId, month, year) => {
    try {
      const response = await TitleReport.findOne({ title_id: titleId, month, year });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  add: async (titleId = '', month = moment().month() + 1, year = MAX_YEAR, like = 0, view = 0) => {
    try {
      const model = new TitleReport({
        title_id: titleId,
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
  update: async (titleId, month, year, view = 0, like = 0) => {
    try {
      const data = { $inc: {} };
      if (view !== 0) data.$inc.view = view;
      if (like !== 0) data.$inc.like = like;

      const response = await TitleReport.findOneAndUpdate(
        { title_id: titleId, month, year },
        data,
        {
          new: true,
        }
      );

      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default titleReportService;
