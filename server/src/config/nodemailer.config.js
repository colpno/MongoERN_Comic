import nodemailer from 'nodemailer';
import { config } from 'dotenv';

config();

const nodemailerConfig = {
  service: 'gmail',
  auth: {
    user: process.env.MAIL_FROM,
    pass: process.env.MAIL_PASS,
  },
};

export const transporter = nodemailer.createTransport(nodemailerConfig);
