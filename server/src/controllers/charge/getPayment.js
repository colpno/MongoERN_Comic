/* eslint-disable no-buffer-constructor */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */

import querystring from 'qs';
import crypto from 'crypto';
import { config } from 'dotenv';

config();

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

function getPayment(req, res) {
  let vnp_Params = req.query;
  const secureHash = vnp_Params.vnp_SecureHash;

  delete vnp_Params.vnp_SecureHash;
  delete vnp_Params.vnp_SecureHashType;

  vnp_Params = sortObject(vnp_Params);
  const secretKey = 'YTGPYQDKNKMPVONPXZIJIBDFQATCKOFS';
  const signData = querystring.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac('sha512', secretKey);
  const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

  if (secureHash === signed) {
    /*
    const orderId = vnp_Params.vnp_TxnRef;
    const rspCode = vnp_Params.vnp_ResponseCode;
	vnp_Params {
		vnp_Amount: '2000000',
		vnp_BankCode: 'NCB',
		vnp_BankTranNo: 'VNP13877874',
		vnp_CardType: 'ATM',
		vnp_OrderInfo: 'Thanh+toan+don+hang',
		vnp_PayDate: '20221115002657',
		vnp_ResponseCode: '00',
		vnp_TmnCode: 'Q9AJ1QOB',
		vnp_TransactionNo: '13877874',
		vnp_TransactionStatus: '00',
		vnp_TxnRef: '001143'
	}
	Kiem tra du lieu co hop le khong,
	cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
    res.status(200).json({ RspCode: '00', Message: 'success' });
    res.status(200).json({ RspCode: '97', Message: 'Fail checksum' });
    */
    res.status(200).redirect(`${process.env.CLIENT_URL}/profile/coin/add?success=true`);
  } else {
    res.status(200).redirect(`${process.env.CLIENT_URL}/profile/coin/add?success=false`);
  }
}

export default getPayment;
