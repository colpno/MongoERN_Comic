import createError from 'http-errors';
import { convertLikeToMoney } from '../helpers/convertCurrency.js';
import transformQueryParams from '../helpers/transformQueryParams.js';
import { chapterService, favoriteService, titleService, userService } from '../services/index.js';
import chapterReportController from './chapterReport.controller.js';
import titleReportController from './titleReport.controller.js';

const favoriteController = {
  getAll: async (req, res, next) => {
    try {
      const { id: userId } = req.userInfo;
      req.query.user_id = userId;

      const params = transformQueryParams(req.query);
      const response = await favoriteService.getAll(params);

      if (response.length === 0 || response.data?.length === 0) {
        return res.status(200).json({
          ...response,
          code: 200,
        });
      }

      return res.status(200).json({
        ...response,
        code: 200,
      });
    } catch (error) {
      return next(error);
    }
  },
  add: async (req, res, next) => {
    try {
      const { id: userId } = req.userInfo;
      const { chapterId } = req.body;

      const duplicated = (await favoriteService.getAll({ user_id: userId, chapter_id: chapterId }))
        .data;

      if (duplicated.length > 0) {
        return next(createError(409, 'Đã tồn tại lượt thích, không thể lặp lại hành động'));
      }

      const response = await favoriteService.add(userId, chapterId);

      if (!response) {
        return next(createError(400, 'Không thể hoàn thành việc tạo lượt thích'));
      }

      const chapter = await chapterService.getOne({ _id: chapterId });

      const chapterPromise = chapterService.increaseLike(chapterId);
      const titlePromise = titleService.increaseLike(chapter.title_id);
      const chapterReportPromise = chapterReportController.add(chapterId, 0, 1);
      const titleReportPromise = titleReportController.add(chapter.title_id, 0, 1);
      const increaseUserIncome = userService.increaseIncome(userId, convertLikeToMoney());
      await Promise.all([
        chapterPromise,
        titlePromise,
        chapterReportPromise,
        titleReportPromise,
        increaseUserIncome,
      ]);

      return res.status(201).json({
        code: 201,
        data: response,
      });
    } catch (error) {
      return next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id: userId } = req.userInfo;
      const { chapterId } = req.query;

      const response = await favoriteService.delete(userId, chapterId);

      if (!response) {
        return next(createError(400, 'không thể hoàn thành việc xóa lượt thích'));
      }

      const chapter = await chapterService.getOne({ _id: chapterId });

      const chapterPromise = chapterService.increaseLike(chapterId, -1);
      const titlePromise = titleService.increaseLike(chapter.title_id, -1);
      const chapterReportPromise = chapterReportController.add(chapterId, 0, -1);
      const titleReportPromise = titleReportController.add(chapter.title_id, 0, -1);
      await Promise.all([chapterPromise, titlePromise, chapterReportPromise, titleReportPromise]);

      return res.status(200).json({
        code: 200,
        data: response,
      });
    } catch (error) {
      return next(error);
    }
  },
};

export default favoriteController;
