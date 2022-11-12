import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import {
  authRoute,
  chapterImageRoute,
  chapterRoute,
  chapterTransactionRoute,
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
} from './routes/index.js';

config();
const app = express();
const PORT = process.env.PORT;
const BASE_URL = process.env.BASE_URL;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL);
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
    origin: process.env.CLIENT_URL,
  })
);

app.use(`${BASE_URL}/chapters`, chapterRoute);
app.use(`${BASE_URL}/chapter-transactions`, chapterTransactionRoute);
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
app.use(`${BASE_URL}/auth`, authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
