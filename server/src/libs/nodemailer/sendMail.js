import { config } from 'dotenv';
import { transporter } from './config.js';

config();

export default function sendMail(to, subject, html) {
  const mailDetails = {
    from: process.env.MAIL_FROM,
    to,
    subject,
    html,
  };

  transporter.sendMail(mailDetails, (err) => {
    if (err) {
      console.log(`Error Occurs: ${err}`);
      return { status: false, error: err };
    }
  });

  console.log('Email sent successfully');
  return { status: true };
}