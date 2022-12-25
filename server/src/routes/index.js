import { Router } from 'express';
import dotenv from 'dotenv';

import authRoute from './auth.route.js';
import chapterRoute from './chapter.route.js';
import chapterTransactionRoute from './chapterTransaction.route.js';
import coinTransactionRoute from './coinTransaction.route.js';
import followRoute from './follow.route.js';
import genreRoute from './genre.route.js';
import paymentMethodRoute from './paymentMethod.route.js';
import readingHistoryRoute from './readingHistory.route.js';
import approvedStatusRoute from './approvedStatus.route.js';
import titleRoute from './title.route.js';
import chargeRoute from './charge.route.js';
import favoriteRoute from './favorite.route.js';
import userRoute from './user.route.js';

dotenv.config();

const routes = Router();
const { BASE_URL } = process.env;

routes.use(`${BASE_URL}/approved-statuses`, approvedStatusRoute);
routes.use(`${BASE_URL}/auth`, authRoute);
routes.use(`${BASE_URL}/chapters`, chapterRoute);
routes.use(`${BASE_URL}/chapter-transactions`, chapterTransactionRoute);
routes.use(`${BASE_URL}/charge`, chargeRoute);
routes.use(`${BASE_URL}/coin-transactions`, coinTransactionRoute);
routes.use(`${BASE_URL}/favorites`, favoriteRoute);
routes.use(`${BASE_URL}/follows`, followRoute);
routes.use(`${BASE_URL}/genres`, genreRoute);
routes.use(`${BASE_URL}/payment-methods`, paymentMethodRoute);
routes.use(`${BASE_URL}/reading-histories`, readingHistoryRoute);
routes.use(`${BASE_URL}/titles`, titleRoute);
routes.use(`${BASE_URL}/users`, userRoute);

export default routes;
