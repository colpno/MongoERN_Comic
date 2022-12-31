import dotenv from 'dotenv';
import paypal from 'paypal-rest-sdk';
import paypalConfig from '../config/paypal.config.js';

dotenv.config();
paypal.configure(paypalConfig);

const paypalService = {
  create: (data = {}, getResponse = () => {}) => {
    try {
      paypal.payment.create(data, (error, payment) => {
        if (error) {
          throw new Error(error.response.message);
        }
        const approvedObject = payment.links.find((link) => link.rel === 'approval_url');
        getResponse(approvedObject);
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  success: (paymentId, payerId, getResponse) => {
    try {
      paypal.payment.execute(paymentId, payerId, (error, payment) => {
        if (error) {
          throw new Error(error);
        }

        if (payment.state === 'approved') {
          getResponse({
            code: 201,
            data: payment,
          });
          return;
        }

        getResponse({
          code: 400,
          data: {},
        });
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  getPayMentData: (items, amount, description) => {
    const paymentData = {
      intent: 'authorize',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: `${process.env.CLIENT_URL}/paypal/success`,
        cancel_url: `${process.env.CLIENT_URL}/paypal/cancel`,
      },
      transactions: [
        {
          item_list: {
            items,
          },
          amount,
          description,
        },
      ],
    };

    return paymentData;
  },
};

export default paypalService;
