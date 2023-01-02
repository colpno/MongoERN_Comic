import { getCurrentTime } from '../helpers/getCurrentTime.js';
import transformQueryParams from '../helpers/transformQueryParams.js';
import chapterReportService from '../services/chapterReport.service.js';

const chapterReportController = {
  getAll: async (req, res, next) => {
    try {
      const params = transformQueryParams(req.query);

      const reports = await chapterReportService.getAll(params);

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
  add: async (chapterId, view, like) => {
    try {
      const { month, year } = getCurrentTime('number');
      const whiteListValues = [-1, 0, 1];

      if (view && !whiteListValues.includes(view)) throw new Error('Dữ liệu không hợp lệ');
      if (like && !whiteListValues.includes(like)) throw new Error('Dữ liệu không hợp lệ');

      if (chapterId) {
        const report = await chapterReportService.getOne(chapterId, month, year);

        if (report) {
          await chapterReportService.update(chapterId, month, year, view, like);
        }

        await chapterReportService.add(chapterId, month, year, like, view);
      } else {
        throw new Error('Dữ liệu không hợp lệ');
      }
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default chapterReportController;
