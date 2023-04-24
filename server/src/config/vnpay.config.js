import dotenv from 'dotenv';

dotenv.config();

const { SERVER_URL, BASE_URL } = process.env;

export const vnpayConfig = {
  tmnCode: 'Q9AJ1QOB',
  secretKey: 'YTGPYQDKNKMPVONPXZIJIBDFQATCKOFS',
  vnpUrl: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
  returnUrl: `${SERVER_URL}${BASE_URL}/vnpay/vnpay_return`,
  // returnUrl: 'localhost:3000/vnpay_return',
};

// 9704198526191432198
// NGUYEN VAN A
// 07/15
// 123456
