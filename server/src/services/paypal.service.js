import dotenv from 'dotenv';
import { randomUUID } from 'crypto';
import axios from 'axios';
import paypal from 'paypal-rest-sdk';
import paypalConfig from '../config/paypal.config.js';

dotenv.config();
paypal.configure(paypalConfig);

const paypalService = {
  createPayment: (data = {}, getResponse = () => {}) => {
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
  createPayout: async (data = {}, getResponse = () => {}) => {
    try {
      const {
        data: { access_token, token_type },
      } = await axios.post(
        'https://api-m.sandbox.paypal.com/v1/oauth2/token',
        { grant_type: 'client_credentials' },
        {
          auth: {
            username:
              'AWRfCXIMEDTS30Sh_aUxlwxjFL3s7bKeq_Bg9Ruuf4FuVM4GMydWfyFDfw-Ij3KVyLn4Byzxtvgy6vxp',
            password:
              'EBX-mF1IcruXg1RjceSf35jTiPzbyL4lN-hqtw3WJvJJuh7RaxLZ2zJcG6j7fpd_Cf4OTvjKDs8lyDWz',
          },
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
      );

      const { data: payout } = await axios.post(
        'https://api-m.sandbox.paypal.com/v1/payments/payouts',
        data,
        { headers: { Authorization: `${token_type} ${access_token}` } }
      );

      const approvedObject = payout.links.find((link) => link.rel === 'self');
      getResponse(approvedObject);
    } catch (error) {
      console.log('file: paypal.service.js:78 ~ error', error.response.data);
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
  getPayoutData: (amount = '', receiver = '') => {
    const payoutData = {
      sender_batch_header: {
        sender_batch_id: randomUUID(),
        email_subject: 'Rút tiền thành công',
        email_message: 'Cảm ơn bạn đã sử dụng dịch vụ của Comico.',
      },
      items: [
        {
          amount: {
            value: Number.parseFloat(amount).toFixed(2).toString(),
            currency: 'USD',
          },
          sender_item_id: randomUUID(),
          recipient_type: 'EMAIL',
          note: 'Cảm ơn bạn đã sử dụng dịch vụ của Comico.',
          receiver,
        },
      ],
    };

    return payoutData;
  },
};

export default paypalService;
