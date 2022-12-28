import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';

import corsMiddleWare from './cors.middleware.js';

config();

// origin: [CLIENT_URL, 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'],
const app = express();
const { CLIENT_URL, ADMIN_URL } = process.env;
const corsURL = { origin: [CLIENT_URL, ADMIN_URL] };

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(
  cors({
    origin: corsURL.origin,
    credentials: true,
  })
);

app.use((req, res, next) => corsMiddleWare(req, res, next, corsURL.origin));

export { app as middlewares, corsURL };
