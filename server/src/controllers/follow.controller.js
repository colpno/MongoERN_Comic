import createHttpError from 'http-errors';
import transformQueryParams from '../helpers/transformQueryParams.js';
import { followService } from '../services/index.js';

const followController = {
  getAll: async (req, res, next) => {
    try {
      const { id: userId } = req.userInfo;
      req.query.userId = userId;

      const params = transformQueryParams(req.query);
      const response = await followService.getAll(params);

      if (response.length === 0 || response.data?.length === 0) {
        next(createHttpError(404, 'Không tìm thấy theo dõi nào'));
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
      const { titleId } = req.body;

      const duplicated = await followService.getAll({ userId, titleId });

      if (duplicated.length > 0) {
        next(createHttpError(409, 'Bạn đã theo dõi truyện trước đó'));
      }

      const response = await followService.add(userId, titleId);

      if (!response) {
        next(createHttpError(400, 'Không thể hoàn thành việc tạo theo dõi'));
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
      const { titleId } = req.query;

      const response = await followService.delete(userId, titleId);

      if (!response) {
        next(createHttpError(400, 'không thể hoàn thành việc xóa theo dõi'));
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

export default followController;
