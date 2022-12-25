/* eslint-disable no-buffer-constructor */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
import moment from 'moment';
import querystring from 'qs';
import crypto from 'crypto';

import { vnpayConfig } from '../config/vnpay.config.js';

const vnpayService = {
  getParams: (req) => {
    const { tmnCode, returnUrl } = vnpayConfig;

    const ipAddr =
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    // const date = new Date();

    // const createDate = dateFormat(date, 'yyyymmddHHmmss');
    const createDate = moment().format('YYYYMMDDHHMMss');
    // const orderId = dateFormat(date, 'HHmmss');
    const orderId = moment().format('HHMMss');
    const amount = 20000;
    const bankCode = 'NCB';

    const orderInfo = 'Thanh toan don hang';
    const orderType = 'topup';
    const locale = 'vn';
    const currCode = 'VND';

    const vnpParams = {};

    vnpParams.vnp_Version = '2.1.0';
    vnpParams.vnp_Command = 'pay';
    vnpParams.vnp_TmnCode = tmnCode;
    // vnpParams['vnp_Merchant'] = ''
    vnpParams.vnp_Locale = locale;
    vnpParams.vnp_CurrCode = currCode;
    vnpParams.vnp_TxnRef = orderId;
    vnpParams.vnp_OrderInfo = orderInfo;
    vnpParams.vnp_OrderType = orderType;
    vnpParams.vnp_Amount = amount * 100;
    vnpParams.vnp_ReturnUrl = returnUrl;
    vnpParams.vnp_IpAddr = ipAddr;
    vnpParams.vnp_CreateDate = createDate;
    if (bankCode !== null && bankCode !== '') {
      vnpParams.vnp_BankCode = bankCode;
    }

    return vnpParams;
  },
  sortObject: (obj) => {
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
  },
  getSigned: (vnpParams) => {
    const { secretKey } = vnpayConfig;

    const signData = querystring.stringify(vnpParams, { encode: false });
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

    return signed;
  },
};

export default vnpayService;
