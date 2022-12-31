import dotenv from 'dotenv';

dotenv.config();

const { PAYPAL_CLIENT_ID, PAYPAL_SECRET } = process.env;

const paypalConfig = {
  mode: 'sandbox', // sandbox or live
  client_id: PAYPAL_CLIENT_ID,
  client_secret: PAYPAL_SECRET,
};

export default paypalConfig;

// email: sb-4iedz24663946@personal.example.com
// pass:  E<9Uy!j9
