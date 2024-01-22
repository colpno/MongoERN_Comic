import axios from 'axios';
import 'dotenv/config';

const prepareData = (data = []) => {
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
};

const { PAYPAL_CLIENT_ID, PAYPAL_SECRET } = process.env;
const base = 'https://api-m.sandbox.paypal.com';

const generateAccessToken = async () => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_SECRET) {
      throw new Error('MISSING_API_CREDENTIALS');
    }
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString('base64');
    const response = await axios(`${base}/v1/oauth2/token`, {
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
};

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

const createOrder = async (data) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;
  const payload = {
    intent: 'CAPTURE',
    purchase_units: [prepareData(JSON.parse(data))],
  };

  const response = await axios(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'post',
    data: JSON.stringify(payload),
  });

  return handleResponse(response.data);
};

const captureOrder = async (orderID) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderID}/capture`;

  const response = await axios(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return handleResponse(response.data);
};

const paypalController = {
  order: async (req, res) => {
    try {
      const { jsonResponse } = await createOrder(req.body.data);
      res.status(201).json(jsonResponse);
    } catch (error) {
      console.error('Failed to create order:', error);
      res.status(500).json({ error: 'Failed to create order.' });
    }
  },
  capture: async (req, res) => {
    try {
      const { orderID } = req.body;
      const { jsonResponse } = await captureOrder(orderID);
      res.status(200).json(jsonResponse);
    } catch (error) {
      console.error('Failed to create order:', error);
      res.status(500).json({ error: 'Failed to capture order.' });
    }
  },
};

export default paypalController;
