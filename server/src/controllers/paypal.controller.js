import { coinHistoryService, paypalService, userService } from '../services/index.js';

const convertMoneyToCoin = (money) => {
  switch (money) {
    case '1.00': {
      return 10;
    }
    case '2.00': {
      return 20;
    }
    case '5.00': {
      return 50;
    }
    case '10.00': {
      return 100;
    }
    case '20.00': {
      return 200;
    }
    default:
      throw new Error('Số tiền không phù hợp');
  }
};

const calcTotal = (items) => {
  const tl = items.reduce(
    (total, item) => total + Number.parseInt(item.price, 10) * item.quantity,
    0
  );
  return `${tl}.00`;
};

const paypalController = {
  create: async (req, res, next) => {
    try {
      const { name, price } = req.body;

      if (name && price) {
        const items = [
          {
            name,
            sku: name,
            price,
            currency: 'USD',
            quantity: 1,
          },
        ];
        const amount = {
          currency: 'USD',
          total: calcTotal(items),
        };
        const description = 'Purchase coin.';

        const paymentData = paypalService.getPayMentData(items, amount, description);

        const getResponse = (response) => {
          res.status(201).json({
            code: 201,
            link: response.href,
          });
        };

        paypalService.create(paymentData, getResponse);
      } else {
        res.status(400).json({
          code: 400,
          message: 'Không đủ dữ liệu đầu vào',
        });
      }
    } catch (error) {
      next(error);
    }
  },
  success: async (req, res, next) => {
    try {
      const { id: userId } = req.userInfo;
      const { paymentId } = req.query;
      const payerId = { payer_id: req.query.PayerID };

      if (paymentId && userId && payerId) {
        const getResponse = async (response) => {
          const docs = response.data.transactions[0].item_list.items.map((item) => ({
            user_id: userId,
            payment_method: 'PayPal',
            amount: convertMoneyToCoin(item.price),
          }));
          await coinHistoryService.addMany(docs);

          const coins = docs.reduce((coin, doc) => coin + doc.amount, 0);
          const user = await userService.update(userId, { $inc: { coin: coins } });

          res.status(response.code).json({ ...response, user });
        };

        paypalService.success(paymentId, payerId, getResponse);
      } else {
        res.status(400).json({
          code: 400,
          message: 'Không đủ dữ liệu đầu vào',
        });
      }
    } catch (error) {
      next(error);
    }
  },
  cancel: async (req, res) => {
    res.status(201).json({
      code: 500,
      message: 'payment cancel',
    });
  },
};

export default paypalController;
