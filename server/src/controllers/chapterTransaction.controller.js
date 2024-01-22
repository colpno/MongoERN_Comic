import createError from 'http-errors';
import { convertPurchaseTransactionToMoney } from '../helpers/convertCurrency.js';
import transformQueryParams from '../helpers/transformQueryParams.js';
import {
  chapterTransactionService,
  transactionService,
  titleService,
  userService,
} from '../services/index.js';

const chapterTransactionController = {
  getAll: async (req, res, next) => {
    try {
      const { id: userId } = req.userInfo;
      req.query.user_id = userId;

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
      const { titleId, chapterId, expiredAt, method, cost } = req.body;

      if (titleId && chapterId && method && cost) {
        const duplicated = (
          await chapterTransactionService.getAll({
            user_id: userId,
            title_id: titleId,
            chapter_id: chapterId,
            method,
          })
        ).data;

        if (duplicated.length > 0) {
          return next(createError(409, 'Đã tồn tại giao dịch'));
        }

        // save to mongo
        const response = await chapterTransactionService.add(
          userId,
          titleId,
          chapterId,
          expiredAt,
          method,
          cost
        );

        if (!response) {
          return next(createError(400, 'Không thể hoàn thành việc tạo giao dịch'));
        }

        // minus user currency
        let user;
        if (method === 'coin') {
          user = await userService.update(userId, { $inc: { coin: -cost } });
          await transactionService.add(userId, 'Mua chương', -cost);

          // increase title owner income
          const title = await titleService.getOne({ _id: titleId });
          await userService.increaseIncome(title.userId, convertPurchaseTransactionToMoney(cost));
        }
        if (method === 'point') {
          user = await userService.update(userId, { $inc: { point: -cost } });
        }
        if (method === 'rent ticket') {
          user = await userService.update(userId, { $inc: { ticket_for_renting: -1 } });
        }
        if (method === 'purchase ticket') {
          user = await userService.update(userId, { $inc: { ticket_for_buying: -1 } });
        }

        const rentList = ['rent ticket'];

        if (rentList.includes(method)) {
          return res.status(201).json({
            code: 201,
            message: `Bạn đã thuê thành công. Bạn có thể đọc đến ${expiredAt}, sau thời gian này bạn sẽ không thể đọc được tiếp nữa.`,
            data: {
              transaction: response,
              user,
            },
          });
        }

        return res.status(201).json({
          code: 201,
          message: 'Bạn đã mua thành công',
          data: {
            transaction: response,
            user,
          },
        });
      }

      return res.status(400).json({
        code: 400,
        message: 'Không đủ dữ liệu đầu vào',
      });
    } catch (error) {
      return next(error);
    }
  },
};

export default chapterTransactionController;
