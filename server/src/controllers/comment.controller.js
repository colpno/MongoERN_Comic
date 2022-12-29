import createError from 'http-errors';

import transformQueryParams from '../helpers/transformQueryParams.js';
import { commentService } from '../services/index.js';

const commentController = {
  getAll: async (req, res, next) => {
    try {
      const params = transformQueryParams(req.query);
      const response = await commentService.getAll(params);

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
      const { userId, text, parentId } = req.body;

      const response = await commentService.add(userId, text, parentId);

      if (!response) {
        return next(createError(400, 'Không thể hoàn thành việc tạo bình luận'));
      }

      return res.status(201).json({
        code: 201,
        data: response,
      });
    } catch (error) {
      return next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id, text, hide } = req.body;

      const response = await commentService.update(id, {
        text,
        hide,
      });

      if (!response) {
        return next(createError(400, 'không thể hoàn thành việc cập nhật tài khoản'));
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

export default commentController;
