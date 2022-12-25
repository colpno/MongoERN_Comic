import dotenv from 'dotenv';

dotenv.config();

const { SERVER_URL, BASE_URL } = process.env;

export const vnpayConfig = {
  tmnCode: 'Q9AJ1QOB',
  secretKey: 'YTGPYQDKNKMPVONPXZIJIBDFQATCKOFS',
  vnpUrl: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
  returnUrl: `${SERVER_URL}${BASE_URL}/charge/vnpay-return`,
};
