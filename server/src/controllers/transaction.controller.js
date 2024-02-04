import transformQueryParams from '../helpers/transformQueryParams.js';
import { transactionService, userService } from '../services/index.js';

const transactionController = {
  getAllOwned: async (req, res, next) => {
    try {
      const { id: userId } = req.userInfo;
      req.query.user_id = userId;

      const params = transformQueryParams(req.query);
      const response = await transactionService.getAll(params);

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
  getAll: async (req, res, next) => {
    try {
      const params = transformQueryParams(req.query);
      const response = await transactionService.getAll(params);

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
      transactionService.checkFields(req.body);
      const { amount, method, unit } = req.body;

      const response = await transactionService.add(userId, method, unit, amount);

      await userService.update(userId, { $inc: { coin: amount } });

      return res.status(201).json({
        data: response,
        code: 201,
      });
    } catch (error) {
      return next(error);
    }
  },
};

export default transactionController;
