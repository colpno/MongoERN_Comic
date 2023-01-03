import dotenv from 'dotenv';
import { Router } from 'express';

import approvedStatusRoute from './approvedStatus.route.js';
import authRoute from './auth.route.js';
import chapterRoute from './chapter.route.js';
import chapterReportRoute from './chapterReport.route.js';
import chapterTransactionRoute from './chapterTransaction.route.js';
import chargeRoute from './charge.route.js';
import coinHistoryRoute from './coinHistory.route.js';
import commentRoute from './comment.route.js';
import favoriteRoute from './favorite.route.js';
import followRoute from './follow.route.js';
import genreRoute from './genre.route.js';
import paymentMethodRoute from './paymentMethod.route.js';
import paypalRoute from './paypal.route.js';
import readingHistoryRoute from './readingHistory.route.js';
import titleRoute from './title.route.js';
import titleReportRoute from './titleReport.route.js';
import userRoute from './user.route.js';
import vnpayRoute from './vnpay.route.js';

dotenv.config();

const routes = Router();
const { BASE_URL } = process.env;

routes.use(`${BASE_URL}/approved-statuses`, approvedStatusRoute);
routes.use(`${BASE_URL}/auth`, authRoute);
routes.use(`${BASE_URL}/chapters`, chapterRoute);
routes.use(`${BASE_URL}/chapter-reports`, chapterReportRoute);
routes.use(`${BASE_URL}/chapter-transactions`, chapterTransactionRoute);
routes.use(`${BASE_URL}/charge`, chargeRoute);
routes.use(`${BASE_URL}/coin-histories`, coinHistoryRoute);
routes.use(`${BASE_URL}/comments`, commentRoute);
routes.use(`${BASE_URL}/favorites`, favoriteRoute);
routes.use(`${BASE_URL}/follows`, followRoute);
routes.use(`${BASE_URL}/genres`, genreRoute);
routes.use(`${BASE_URL}/payment-methods`, paymentMethodRoute);
routes.use(`${BASE_URL}/reading-histories`, readingHistoryRoute);
routes.use(`${BASE_URL}/titles`, titleRoute);
routes.use(`${BASE_URL}/title-reports`, titleReportRoute);
routes.use(`${BASE_URL}/vnpay`, vnpayRoute);
routes.use(`${BASE_URL}/paypal`, paypalRoute);
routes.use(`${BASE_URL}/users`, userRoute);

export default routes;
