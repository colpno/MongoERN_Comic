import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';

config();

const app = express();
const { CLIENT_URL, ADMIN_URL } = process.env;
const corsURL = {
  origin: [CLIENT_URL, ADMIN_URL],
};

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(
  cors({
    origin: corsURL.origin,
    credentials: true,
  })
);

export { app as middlewares, corsURL };
