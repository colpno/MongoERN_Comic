import { getCurrentTime } from '../helpers/getCurrentTime.js';
import transformQueryParams from '../helpers/transformQueryParams.js';
import titleReportService from '../services/titleReport.service.js';

const titleReportController = {
  getAll: async (req, res, next) => {
    try {
      const params = transformQueryParams(req.query);
      const reports = await titleReportService.getAll(params);

      if (reports.length === 0) {
        return res.status(200).json({
          ...reports,
          code: 200,
        });
      }

      return res.status(200).json({
        ...reports,
        code: 200,
      });
    } catch (error) {
      return next(error);
    }
  },
  add: async (titleId, view, like) => {
    try {
      const { month, year } = getCurrentTime('number');
      const whiteListValues = [-1, 0, 1];

      if (view && !whiteListValues.includes(view)) throw new Error('Dữ liệu không hợp lệ');
      if (like && !whiteListValues.includes(like)) throw new Error('Dữ liệu không hợp lệ');

      if (titleId) {
        const report = await titleReportService.getOne(titleId, month, year);

        if (report) {
          return await titleReportService.update(titleId, month, year, view, like);
        }

        return await titleReportService.add(titleId, month, year, like, view);
      }

      throw new Error('Dữ liệu không hợp lệ');
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default titleReportController;
