import paginateSort from '../helpers/paginateSort.js';
import { TitleReport } from '../models/index.js';
import { MIN_MONTH, MAX_YEAR } from '../validations/index.js';

const titleReportService = {
  getAll: async (params = {}) => {
    const { _limit, _sort, _order } = params;

    if (_limit || (_sort && _order)) {
      const response = await paginateSort(params, TitleReport);
      return response;
    }

    const response = await TitleReport.find(params);
    return { data: response };
  },
  getOne: async (titleId, month, year) => {
    const response = await TitleReport.findOne({ title_id: titleId, month, year });
    return response;
  },
  add: async (titleId = '', likes = 0, views = 0, month = MIN_MONTH, year = MAX_YEAR) => {
    const model = new TitleReport({
      title_id: titleId,
      likes,
      views,
      month,
      year,
    });

    const response = await model.save();
    return response;
  },
  update: async (titleId, month, year, type = 'views' || 'likes', value = 1) => {
    const response = await TitleReport.findOneAndUpdate(
      { title_id: titleId, month, year },
      { $inc: { [type]: value } },
      { new: true }
    );

    return response;
  },
};

export default titleReportService;
