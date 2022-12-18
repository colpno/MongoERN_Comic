import { config } from 'dotenv';
import {
  authRoute,
  chapterImageRoute,
  chapterRoute,
  purchasedChapterRoute,
  coinTransactionRoute,
  followRoute,
  genreRoute,
  paymentMethodRoute,
  readingHistoryRoute,
  approvedStatusRoute,
  titleGenreRoute,
  titleReportRoute,
  titleRoute,
  userRoute,
  chargeRoute,
  userLikeRoute,
  hiredChapterRoute,
} from './index.js';

config();

const { BASE_URL } = process.env;

export default function routeDivider(expressApp) {
  expressApp.use(`${BASE_URL}/chapters`, chapterRoute);
  expressApp.use(`${BASE_URL}/purchased-chapters`, purchasedChapterRoute);
  expressApp.use(`${BASE_URL}/hired-chapters`, hiredChapterRoute);
  expressApp.use(`${BASE_URL}/chapter-images`, chapterImageRoute);
  expressApp.use(`${BASE_URL}/coin-transactions`, coinTransactionRoute);
  expressApp.use(`${BASE_URL}/follows`, followRoute);
  expressApp.use(`${BASE_URL}/genres`, genreRoute);
  expressApp.use(`${BASE_URL}/payment-methods`, paymentMethodRoute);
  expressApp.use(`${BASE_URL}/reading-histories`, readingHistoryRoute);
  expressApp.use(`${BASE_URL}/approved-statuses`, approvedStatusRoute);
  expressApp.use(`${BASE_URL}/titles`, titleRoute);
  expressApp.use(`${BASE_URL}/title-genres`, titleGenreRoute);
  expressApp.use(`${BASE_URL}/title-reports`, titleReportRoute);
  expressApp.use(`${BASE_URL}/users`, userRoute);
  expressApp.use(`${BASE_URL}/user-like`, userLikeRoute);
  expressApp.use(`${BASE_URL}/auth`, authRoute);
  expressApp.use(`${BASE_URL}/charge`, chargeRoute);
}
