import createError from 'http-errors';
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
      const { titleId } = req.body;

      const duplicated = (await followService.getAll({ userId, titleId })).data;

      if (duplicated.length > 0) {
        return next(createError(409, 'Bạn đã theo dõi truyện trước đó'));
      }

      const response = await followService.add(userId, titleId);

      if (!response) {
        return next(createError(400, 'Không thể hoàn thành việc tạo theo dõi'));
      }

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
      const { titleId } = req.query;

      const response = await followService.delete(userId, titleId);

      if (!response) {
        return next(createError(400, 'không thể hoàn thành việc xóa theo dõi'));
      }

      return res.status(200).json({
        code: 200,
        data: response,
      });
    } catch (error) {
      return next(error);
    }
  },
};

export default followController;
