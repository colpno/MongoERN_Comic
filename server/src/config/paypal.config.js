import dotenv from 'dotenv';

dotenv.config();

export const { PAYPAL_CLIENT_ID, PAYPAL_SECRET } = process.env;
export const PAYPAL_URL = 'https://api-m.sandbox.paypal.com';
