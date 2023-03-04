import dotenv from 'dotenv';
import { transporter } from '../config/nodemailer.config.js';

dotenv.config();

export const sendMail = (to, subject, html) => {
  const mailDetails = {
    from: process.env.MAIL_FROM,
    to,
    subject,
    html,
  };

  transporter.sendMail(mailDetails, (err) => {
    if (err) {
      throw new Error(err);
    }
  });
};
