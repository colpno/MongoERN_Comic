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
  getPaymentData: (items, amount, description) => {
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
  // getPayoutData: (amount = 0, receiver = '', note = '') => {
  getPayoutData: () => {
    const sender_batch_id = Math.random().toString(36).substring(9);

    const payoutData = {
      sender_batch_header: {
        sender_batch_id,
        email_subject: 'You have a payment',
      },
      items: [
        {
          recipient_type: 'EMAIL',
          amount: {
            value: '1.00',
            currency: 'USD',
          },
          receiver: 'sb-gkrrx24563237@business.example.com',
          note: 'Rút tiền',
          sender_item_id: 'item_3',
        },
      ],
    };

    return payoutData;
  },
};

export default paypalService;
