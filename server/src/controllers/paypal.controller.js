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

const prepareData = (data = []) => {
  const initialValues = {
    items: [],
    amount: {
      currency: 'USD',
      total: '0.00',
    },
    description: '',
  };

  const { items, amount, description } = data.reduce((object, item) => {
    const { name, price, quantity, description: desc } = item;
    const total = Number.parseFloat(object.amount.total) + price * quantity;

    return {
      items: [
        ...object.items,
        {
          name,
          sku: name,
          price,
          currency: 'USD',
          quantity,
        },
      ],
      amount: {
        ...object.amount,
        total: total.toFixed(2).toString(),
      },
      description: desc,
    };
  }, initialValues);
  return { items, amount, description };
};

const paypalController = {
  payment: async (req, res, next) => {
    try {
      const { data } = req.body;

      if (Array.isArray(data) && data.length > 0) {
        const { items, amount, description } = prepareData(data);
        const paymentData = paypalService.getPaymentData(items, amount, description);

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
  payout: async (req, res, next) => {
    try {
      const payoutData = paypalService.getPayoutData();

      const getResponse = (response) => {
        res.status(201).json({
          code: 201,
          link: response.href,
        });
      };

      paypalService.create(payoutData, getResponse);
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
          let product = '';
          const docs = response.data.transactions[0].item_list.items.map((item) => {
            product = item.name;

            return {
              user_id: userId,
              payment_method: 'PayPal',
              amount: convertMoneyToCoin(item.price),
            };
          });

          if (product === 'coin') {
            await coinHistoryService.addMany(docs);

            const coins = docs.reduce((coin, doc) => coin + doc.amount, 0);
            const user = await userService.update(userId, { $inc: { coin: coins } });

            res.status(response.code).json({ ...response, user });
          }
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
