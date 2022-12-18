/* eslint-disable no-buffer-constructor */
/* eslint-disable camelcase */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
// import dateFormat from 'dateformat';
import moment from 'moment';
import querystring from 'qs';
import crypto from 'crypto';
import { vnpayConfig } from '../../config/vnpay.config.js';

function sortObject(obj) {
  const sorted = {};
  const str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
  }
  return sorted;
}

function createPayment(req, res) {
  const ipAddr =
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  const { tmnCode, secretKey, returnUrl } = vnpayConfig;
  let { vnpUrl } = vnpayConfig;

  // const date = new Date();

  // const createDate = dateFormat(date, 'yyyymmddHHmmss');
  // const orderId = dateFormat(date, 'HHmmss');
  const createDate = moment().format('YYYYMMDDHHMMss');
  const orderId = moment().format('HHMMss');
  const amount = 20000;
  const bankCode = 'NCB';

  const orderInfo = 'Thanh toan don hang';
  const orderType = 'topup';
  const locale = 'vn';
  const currCode = 'VND';
  let vnp_Params = {};
  vnp_Params.vnp_Version = '2.1.0';
  vnp_Params.vnp_Command = 'pay';
  vnp_Params.vnp_TmnCode = tmnCode;
  // vnp_Params['vnp_Merchant'] = ''
  vnp_Params.vnp_Locale = locale;
  vnp_Params.vnp_CurrCode = currCode;
  vnp_Params.vnp_TxnRef = orderId;
  vnp_Params.vnp_OrderInfo = orderInfo;
  vnp_Params.vnp_OrderType = orderType;
  vnp_Params.vnp_Amount = amount * 100;
  vnp_Params.vnp_ReturnUrl = returnUrl;
  vnp_Params.vnp_IpAddr = ipAddr;
  vnp_Params.vnp_CreateDate = createDate;
  if (bankCode !== null && bankCode !== '') {
    vnp_Params.vnp_BankCode = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);

  const signData = querystring.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac('sha512', secretKey);
  const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
  vnp_Params.vnp_SecureHash = signed;
  vnpUrl += `?${querystring.stringify(vnp_Params, { encode: false })}`;

  res.redirect(vnpUrl);
}

export default createPayment;
