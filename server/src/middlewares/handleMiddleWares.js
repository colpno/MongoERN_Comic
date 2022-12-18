import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';

import { corsMiddleWare } from './index.js';

// origin: [CLIENT_URL, 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'],

config();

const { CLIENT_URL, ADMIN_URL } = process.env;
const corsURL = [CLIENT_URL, ADMIN_URL];

export default function handleMiddleWares(expressApp) {
  expressApp.use((req, res, next) => corsMiddleWare(req, res, next, corsURL));
  expressApp.use(express.json({ limit: '50mb' }));
  expressApp.use(cookieParser());
  expressApp.use(cors({ origin: corsURL }));
}
