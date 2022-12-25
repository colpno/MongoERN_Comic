import createHttpError from 'http-errors';
import transformQueryParams from '../helpers/transformQueryParams.js';
import { favoriteService } from '../services/index.js';

const favoriteController = {
  getAll: async (req, res, next) => {
    try {
      const { id: userId } = req.userInfo;
      req.query.userId = userId;

      const params = transformQueryParams(req.query);
      const response = await favoriteService.getAll(params);

      if (response.length === 0 || response.data?.length === 0) {
        next(createHttpError(404, 'Không tìm thấy lượt thích nào'));
      }

      return res.status(200).json({
        code: 200,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  add: async (req, res, next) => {
    try {
      const { id: userId } = req.userInfo;
      const { chapterId } = req.body;

      const duplicated = await favoriteService.getAll({ userId, chapterId });

      if (duplicated.length > 0) {
        next(createHttpError(409, 'Đã tồn tại lượt thích, không thể lặp lại hành động'));
      }

      const response = await favoriteService.add(userId, chapterId);

      if (!response) {
        next(createHttpError(400, 'Không thể hoàn thành việc tạo lượt thích'));
      }

      return res.status(201).json({
        code: 201,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id: userId } = req.userInfo;
      const { chapterId } = req.query;

      const response = await favoriteService.delete(userId, chapterId);

      if (!response) {
        next(createHttpError(400, 'không thể hoàn thành việc xóa lượt thích'));
      }

      return res.status(200).json({
        code: 200,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default favoriteController;
