import bcrypt from 'bcryptjs';

import { sendMail } from '../helpers/sendMail.js';
import { Otp } from '../models/index.js';

const otpService = {
  hashOTP: (otp) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashedOTP = bcrypt.hashSync(otp, salt);
      return hashedOTP;
    } catch (error) {
      throw new Error(error);
    }
  },
  generateOTP(length) {
    try {
      let otp = '';
      for (let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10).toString();
      }
      const hashedOTP = this.hashOTP(otp);

      return { otp, hashedOTP };
    } catch (error) {
      throw new Error(error);
    }
  },
  sendViaMail: (email, otp) => {
    try {
      const subject = 'Mã xác thực';
      const html = `
      <div style="backgroundColor: #ededed">
        <span>Mã xác thực của bạn là: </span>
        <strong style="fontSize: 19px; letterSpacing: 1px;">
          ${otp}
        </strong>
      </div>
      </br>
      <p>Hết hạn sau <strong>15</strong> phút</p>
    `;

      sendMail(email, subject, html);
    } catch (error) {
      throw new Error(error);
    }
  },
  getOne: (username, email) => {
    try {
      const response = Otp.findOne({
        username,
        email,
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  async add(username, email, code) {
    try {
      const existedOTP = await Otp.findOne({ username, email });
      const hashedOTP = this.hashOTP(code);

      if (existedOTP) {
        const response = await Otp.updateOne({ username, email }, { code: hashedOTP });
        return response;
      }

      const model = new Otp({
        username,
        email,
        code: hashedOTP,
      });

      const response = await model.save();
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  delete: async (username, email) => {
    try {
      const response = await Otp.findOneAndDelete({ username, email });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default otpService;
