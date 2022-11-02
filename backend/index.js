import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import {
  authRoute,
  chapterRoute,
  chapterTransactionRoute,
  coinTransactionRoute,
  followRoute,
  genreRoute,
  paymentMethodRoute,
  readingHistoryRoute,
  statusRoute,
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
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use(`${BASE_URL}/chapters`, chapterRoute);
app.use(`${BASE_URL}/chapter-transactions`, chapterTransactionRoute);
app.use(`${BASE_URL}/coin-transactions`, coinTransactionRoute);
app.use(`${BASE_URL}/follows`, followRoute);
app.use(`${BASE_URL}/genres`, genreRoute);
app.use(`${BASE_URL}/payment-methods`, paymentMethodRoute);
app.use(`${BASE_URL}/reading-histories`, readingHistoryRoute);
app.use(`${BASE_URL}/statuses`, statusRoute);
app.use(`${BASE_URL}/titles`, titleRoute);
app.use(`${BASE_URL}/title-genres`, titleGenreRoute);
app.use(`${BASE_URL}/title-reports`, titleReportRoute);
app.use(`${BASE_URL}/users`, userRoute);
app.use(`${BASE_URL}/auth`, authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
