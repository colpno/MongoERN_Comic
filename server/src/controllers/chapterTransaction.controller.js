import createError from 'http-errors';
import moment from 'moment';
import { coinToDollar } from '../helpers/convertCurrency.js';
import transformQueryParams from '../helpers/transformQueryParams.js';
import {
  chapterTransactionService,
  incomeService,
  paypalService,
  titleService,
  transactionService,
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
      const coin = Number.parseInt(cost, 10);

      if (titleId && chapterId && method && coin) {
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

        let user = await userService.getOne({ _id: userId });
        const sellerIncomeInDollar = incomeService.make(coinToDollar(coin));
        const title = await titleService.getOne({ _id: titleId });
        const currentMonth = moment().month();
        const currentYear = moment().year();

        if (!user.paypal_email) {
          return res.status(404).json({
            code: 404,
            message:
              'Bạn cần phải cập nhật thông tin paypal (tại Profile) với chúng tôi để có thể rút tiền',
          });
        }

        let response;
        if (method === 'coin') {
          if (user.coin - coin < 0) {
            return res.status(400).json({
              code: 400,
              message:
                'Số coin hiện tại bạn sở hữu không đủ. Vui lòng nạp thêm để có thể sử dụng chức năng này.',
            });
          }

          const paypalResponse = await paypalService.payout(
            sellerIncomeInDollar,
            user.paypal_email
          );

          user = await userService.update(userId, { $inc: { coin: -coin } });

          // eslint-disable-next-line no-unsafe-optional-chaining
          const { batch_status = '' } = paypalResponse?.data?.batch_header;
          if (batch_status === 'SUCCESS' || batch_status === 'PENDING') {
            await userService.increaseIncome(title.user_id, sellerIncomeInDollar);

            // save to mongo
            response = await chapterTransactionService.add(
              userId,
              titleId,
              chapterId,
              expiredAt,
              method,
              coin
            );

            if (!response) {
              return next(createError(400, 'Không thể hoàn thành việc tạo giao dịch'));
            }

            await transactionService.add(userId, 'Mua chương', 'chapter', -coin);

            const incomeStat = await incomeService.getOne(title.user_id, currentMonth, currentYear);
            if (incomeStat) {
              await incomeService.update(
                title.user_id,
                currentMonth,
                currentYear,
                'purchased_chapter_income',
                sellerIncomeInDollar
              );
            } else {
              await incomeService.add(
                title.user_id,
                currentMonth,
                currentYear,
                sellerIncomeInDollar
              );
            }
          }
        }
        if (method === 'point') {
          user = await userService.update(userId, { $inc: { point: -coin } });
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
