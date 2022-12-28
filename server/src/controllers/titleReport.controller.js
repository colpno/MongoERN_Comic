import { getCurrentTime } from '../helpers/getCurrentTime';
import transformQueryParams from '../helpers/transformQueryParams';
import titleReportService from '../services/titleReport.service';

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
        code: 200,
        data: reports,
      });
    } catch (error) {
      return next(error);
    }
  },
  getOne: async (req, res, next) => {
    try {
      const { titleId, month, year } = req.query;

      const report = await titleReportService.getOne(titleId, month, year);

      if (!report) {
        return res.status(200).json({
          code: 200,
          data: {},
        });
      }

      return res.status(200).json({
        code: 200,
        data: report,
      });
    } catch (error) {
      return next(error);
    }
  },
  add: async (titleId = '', type = 'views' || 'likes') => {
    try {
      const { month, year } = getCurrentTime('number');

      const report = await titleReportService.getOne(titleId, month, year);

      if (report) {
        await titleReportService.update(titleId, month, year, type, 1); // increase by 1
      } else {
        const views = type === 'views' ? 1 : 0;
        const likes = type === 'likes' ? 1 : 0;

        await titleReportService.add(titleId, likes, views, month, year);
      }
    } catch (error) {
      throw new Error(error);
    }
  },
  delete: async (titleId, month, year, value) => {
    try {
      const report = await titleReportService.getOne(titleId, month, year);

      if (report) {
        await titleReportService.update(titleId, month, year, 'views', -value);
        await titleReportService.update(titleId, month, year, 'likes', -value);
      }
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default titleReportController;
