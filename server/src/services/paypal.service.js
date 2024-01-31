import dotenv from 'dotenv';
import { randomUUID } from 'crypto';
import axios from 'axios';
import { PAYPAL_CLIENT_ID, PAYPAL_SECRET, PAYPAL_URL } from '../config/paypal.config.js';

dotenv.config();

async function handleResponse(response) {
  try {
    const jsonResponse = response;
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = response;
    throw new Error(errorMessage);
  }
}

const paypalService = {
  order: async (data) => {
    const accessToken = await paypalService.generateAccessToken();
    const url = `${PAYPAL_URL}/v2/checkout/orders`;
    const payload = {
      intent: 'CAPTURE',
      purchase_units: [paypalService.createPaymentData(JSON.parse(data))],
    };

    const response = await axios(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'post',
      data: JSON.stringify(payload),
    });

    const { jsonResponse } = await handleResponse(response.data);
    return jsonResponse;
  },
  capture: async (orderId) => {
    const accessToken = await paypalService.generateAccessToken();
    const url = `${PAYPAL_URL}/v2/checkout/orders/${orderId}/capture`;

    const response = await axios(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { jsonResponse } = await handleResponse(response.data);
    return jsonResponse;
  },
  payout: async (amount, receiverEmail) => {
    const payload = paypalService.createPayoutData(amount, receiverEmail);
    const accessToken = await paypalService.generateAccessToken();
    const url = `${PAYPAL_URL}/v1/payments/payouts`;

    const response = await axios(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      data: JSON.stringify(payload),
    });

    return response;
  },
  createPaymentData: (data = []) => {
    try {
      const initialValues = {
        items: [],
        amount: {
          currency_code: 'USD',
          value: '0.00',
        },
        description: '',
      };

      const { items, amount, description } = data.reduce((object, item) => {
        const { name, price, quantity, description: desc } = item;
        const value = Number.parseFloat(object.amount.value) + price * quantity;

        return {
          items: [
            ...object.items,
            {
              name,
              quantity,
              unit_amount: {
                currency_code: 'USD',
                value,
              },
            },
          ],
          amount: {
            ...object.amount,
            value: value.toFixed(2).toString(),
            breakdown: {
              item_total: {
                value: value.toFixed(2).toString(),
                currency_code: 'USD',
              },
            },
          },
          description: desc,
        };
      }, initialValues);
      return { items, amount, description };
    } catch (error) {
      throw new Error(error);
    }
  },
  createPayoutData: (amount, receiverEmail) => ({
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
        receiver: receiverEmail,
      },
    ],
  }),
  generateAccessToken: async () => {
    try {
      if (!PAYPAL_CLIENT_ID || !PAYPAL_SECRET) {
        throw new Error('MISSING_API_CREDENTIALS');
      }
      const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString('base64');
      const response = await axios(`${PAYPAL_URL}/v1/oauth2/token`, {
        method: 'post',
        data: 'grant_type=client_credentials',
        headers: {
          Authorization: `Basic ${auth}`,
        },
      });

      return response.data.access_token;
    } catch (error) {
      console.error('Failed to generate Access Token:', error);
    }
  },
};

export default paypalService;
