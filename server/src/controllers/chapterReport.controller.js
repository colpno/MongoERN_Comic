import createHttpError from 'http-errors';
import { getCurrentTime } from '../helpers/getCurrentTime';
import transformQueryParams from '../helpers/transformQueryParams';
import chapterReportService from '../services/chapterReport.service';

const chapterReportController = {
  getAll: async (req, res, next) => {
    try {
      const params = transformQueryParams(req.query);
      const reports = await chapterReportService.getAll(params);

      if (reports.length === 0) next(createHttpError(404, 'Không tìm thấy báo cáo nào'));

      return res.status(200).json({ data: reports });
    } catch (error) {
      next(error);
    }
  },
  getOne: async (req, res, next) => {
    try {
      const { chapterId, month, year } = req.query;

      const report = await chapterReportService.getOne(chapterId, month, year);

      if (!report) next(createHttpError(404, 'Không tìm thấy báo cáo nào'));

      return res.status(200).json({ data: report });
    } catch (error) {
      next(error);
    }
  },
  add: async (chapterId = '', type = 'views' || 'likes', value = 1) => {
    try {
      const { month, year } = getCurrentTime('number');

      const report = await chapterReportService.getOne(chapterId, month, year);

      if (report) {
        await chapterReportService.update(chapterId, month, year, type, value);
      } else {
        const views = type === 'views' ? 1 : 0;
        const likes = type === 'likes' ? 1 : 0;

        await chapterReportService.add(chapterId, likes, views, month, year);
      }
    } catch (error) {
      throw new Error(error);
    }
  },
  delete: async (chapterId, month, year, value) => {
    try {
      const report = await chapterReportService.getOne(chapterId, month, year);

      if (report) {
        await chapterReportService.update(chapterId, month, year, 'views', -value);
        await chapterReportService.update(chapterId, month, year, 'likes', -value);
      }
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default chapterReportController;
