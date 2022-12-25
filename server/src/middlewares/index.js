import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';

import corsMiddleWare from './cors.middleware.js';
import serverError from './serverError.middleware.js';

config();

// origin: [CLIENT_URL, 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'],
const app = express();
const { CLIENT_URL, ADMIN_URL } = process.env;
const corsURL = { origin: [CLIENT_URL, ADMIN_URL] };

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(cors(corsURL));

app.use((req, res, next) => corsMiddleWare(req, res, next, corsURL.origin));
app.use(serverError);

export { app as middlewares, corsURL };
