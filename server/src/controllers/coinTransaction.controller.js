import createError from 'http-errors';
import transformQueryParams from '../helpers/transformQueryParams.js';
import { coinTransactionService } from '../services/index.js';

const coinTransactionController = {
  getAll: async (req, res, next) => {
    try {
      const { id: userId } = req.userInfo;
      req.query.userId = userId;

      const params = transformQueryParams(req.query);
      const response = await coinTransactionService.getAll(params);

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
      const { paymentMethodId, amount } = req.body;

      const response = await coinTransactionService.add(userId, paymentMethodId, amount);

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

export default coinTransactionController;
