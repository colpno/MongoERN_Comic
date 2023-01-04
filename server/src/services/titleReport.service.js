import moment from 'moment';
import paginateSort from '../helpers/paginateSort.js';
import { TitleReport } from '../models/index.js';
import { MAX_YEAR } from '../validations/index.js';

const titleReportService = {
  getAll: async (params = {}) => {
    const { _page, _limit, _sort, _order, _fields, _embed, ...others } = params;

    if (_limit || (_sort && _order)) {
      const response = await paginateSort(params, TitleReport);
      return response;
    }

    const response = await TitleReport.find(others).select(_fields).populate(_embed);
    return { data: response };
  },
  getOne: async (titleId, month, year) => {
    const response = await TitleReport.findOne({ title_id: titleId, month, year });
    return response;
  },
  add: async (titleId = '', month = moment().month() + 1, year = MAX_YEAR, like = 0, view = 0) => {
    const model = new TitleReport({
      title_id: titleId,
      like,
      view,
      month,
      year,
    });

    const response = await model.save();
    return response;
  },
  update: async (titleId, month, year, view = 0, like = 0) => {
    const data = { $inc: {} };
    if (view !== 0) data.$inc.view = view;
    if (like !== 0) data.$inc.like = like;

    const response = await TitleReport.findOneAndUpdate({ title_id: titleId, month, year }, data, {
      new: true,
    });

    return response;
  },
};

export default titleReportService;
