import { transporter } from './config.js';
import { config } from 'dotenv';

config();

export default function sendMail(res, successfullyMessage, to, subject, html) {
  const mailDetails = {
    from: process.env.MAIL_FROM,
    to,
    subject,
    html,
  };

  transporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log(`Error Occurs: ${err}`);
      return res.status(500).json({ error: err });
    } else {
      console.log('Email sent successfully');
      return res.status(200).json({ message: successfullyMessage });
    }
  });
}