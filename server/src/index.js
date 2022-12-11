import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
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
} from './routes/index.js';

config();
const app = express();
const { PORT, BASE_URL, CLIENT_URL, ADMIN_URL } = process.env;
// [ process.env.CLIENT_URL, 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html', ]
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', [CLIENT_URL, ADMIN_URL]);

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type: application/json',
    'Content-Type: multipart/form-data'
  );
  res.header('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS');

  next();
});
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(
  cors({
    // origin: [CLIENT_URL, 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'],
    origin: [CLIENT_URL, ADMIN_URL],
  })
);

app.use(`${BASE_URL}/chapters`, chapterRoute);
app.use(`${BASE_URL}/purchased-chapters`, purchasedChapterRoute);
app.use(`${BASE_URL}/hired-chapters`, hiredChapterRoute);
app.use(`${BASE_URL}/chapter-images`, chapterImageRoute);
app.use(`${BASE_URL}/coin-transactions`, coinTransactionRoute);
app.use(`${BASE_URL}/follows`, followRoute);
app.use(`${BASE_URL}/genres`, genreRoute);
app.use(`${BASE_URL}/payment-methods`, paymentMethodRoute);
app.use(`${BASE_URL}/reading-histories`, readingHistoryRoute);
app.use(`${BASE_URL}/approved-statuses`, approvedStatusRoute);
app.use(`${BASE_URL}/titles`, titleRoute);
app.use(`${BASE_URL}/title-genres`, titleGenreRoute);
app.use(`${BASE_URL}/title-reports`, titleReportRoute);
app.use(`${BASE_URL}/users`, userRoute);
app.use(`${BASE_URL}/user-like`, userLikeRoute);
app.use(`${BASE_URL}/auth`, authRoute);
app.use(`${BASE_URL}/charge`, chargeRoute);

app.listen(PORT, () => {
  // console.log(`Server is running on localhost:${PORT}`);
  console.log(`Server is running on ${process.env.SERVER_URL}`);
});
