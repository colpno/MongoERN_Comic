/* eslint-disable camelcase */
import querystring from 'qs';
import dotenv from 'dotenv';

import { vnpayConfig } from '../config/vnpay.config.js';
import vnpayService from '../services/vnpay.service.js';

dotenv.config();

const vnpayController = {
  createPayment: (req, res) => {
    let { vnpUrl } = vnpayConfig;

    let vnp_Params = vnpayService.getParams(req);
    vnp_Params = vnpayService.sortObject(vnp_Params);

    vnp_Params.vnp_SecureHash = vnpayService.getSigned(vnp_Params);
    vnpUrl += `?${querystring.stringify(vnp_Params, { encode: false })}`;

    res.redirect(vnpUrl);
  },
  getPayment: (req, res) => {
    let vnp_Params = req.query;
    const secureHash = vnp_Params.vnp_SecureHash;

    delete vnp_Params.vnp_SecureHash;
    delete vnp_Params.vnp_SecureHashType;

    vnp_Params = vnpayService.sortObject(vnp_Params);
    const signed = vnpayService.getSigned(vnp_Params);

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
  },
};

export default vnpayController;
