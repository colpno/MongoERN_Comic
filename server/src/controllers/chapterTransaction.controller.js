import createError from 'http-errors';
import transformQueryParams from '../helpers/transformQueryParams.js';
import { chapterTransactionService } from '../services/index.js';

const chapterTransactionController = {
  getAll: async (req, res, next) => {
    try {
      const { id: userId } = req.userInfo;
      req.query.userId = userId;

      const params = transformQueryParams(req.query);
      const response = await chapterTransactionService.getAll(params);

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
      const { chapterId, expiredAt, method, cost } = req.body;

      const duplicated = (await chapterTransactionService.getAll({ userId, chapterId, method }))
        .data;

      if (duplicated.length > 0) {
        return next(createError(409, 'Đã tồn tại giao dịch'));
      }

      const response = await chapterTransactionService.add(
        userId,
        chapterId,
        expiredAt,
        method,
        cost
      );

      if (!response) {
        return next(createError(400, 'Không thể hoàn thành việc tạo giao dịch'));
      }

      return res.status(201).json({
        code: 201,
        data: response,
      });
    } catch (error) {
      return next(error);
    }
  },
};

export default chapterTransactionController;
