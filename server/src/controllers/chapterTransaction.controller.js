import createHttpError from 'http-errors';
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
        next(createHttpError(404, 'Không tìm thấy giao dịch nào'));
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
      const { chapterId, expiredAt, method, cost } = req.body;

      const duplicated = await chapterTransactionService.getAll({ userId, chapterId, method });

      if (duplicated.length > 0) {
        next(createHttpError(409, 'Đã tồn tại giao dịch'));
      }

      const response = await chapterTransactionService.add(
        userId,
        chapterId,
        expiredAt,
        method,
        cost
      );

      if (!response) {
        next(createHttpError(400, 'Không thể hoàn thành việc tạo giao dịch'));
      }

      return res.status(201).json({
        code: 201,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default chapterTransactionController;
