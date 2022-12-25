import bcrypt from 'bcryptjs';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import moment from 'moment';

import { authService, otpService, userService } from '../services/index.js';

const authController = {
  verifyRegister: (req, res, next) => {
    try {
      const { token } = req.params;
      if (!token) next(createHttpError(401, 'Bạn không thể sử dụng chức năng này'));

      jwt.verify(token, process.env.REGISTER_TOKEN_KEY, async (error, userInfo) => {
        if (error) next(createHttpError(403, 'Token không hợp lệ'));

        await userService.update(userInfo.id, { active: true });

        return res.status(200).json({ message: 'Kích hoạt tài khoản thành công' });
      });
    } catch (error) {
      next(createHttpError(500, error));
    }
  },
  logout: (req, res) => {
    res
      .clearCookie('accessToken', {
        secure: true,
        sameSite: 'none',
      })
      .status(200)
      .json({ message: 'Đăng xuất thành công' });
  },
  async login(req, res, next) {
    try {
      const { username, password } = req.body;

      const user = await userService.getAll({ username })[0];
      if (!user) next(createHttpError(404, 'Tên đăng nhập không tồn tại'));

      const samePassword = bcrypt.compareSync(password, user.password);
      if (!samePassword) next(createHttpError(403, 'Mật khẩu không chính xác'));

      req.body.email = user.email;
      req.body.id = user.id;
      return await this.sendOTP(req, res, next);
    } catch (error) {
      next(createHttpError(500, error));
    }
  },
  sendOTP: async (req, res, next) => {
    try {
      const { id, username, email } = req.body;
      const TOKEN_EXPIRED_TIME = 15;
      const OTP_LENGTH = 4;

      const { otp } = otpService.generateOTP(OTP_LENGTH);
      await otpService.add(username, email, otp);
      otpService.sendViaMail(email, otp);

      const expiredAt = moment().add(TOKEN_EXPIRED_TIME, 'm').toISOString();
      // const cookieData = JSON.stringify({ id, username, email, expiredAt });

      return (
        res
          // .clearCookie('loginInfo', {
          //   secure: true,
          //   sameSite: 'none',
          // })
          // .cookie('loginInfo', cookieData, {
          //   maxAge: TOKEN_EXPIRED_TIME * 60 * 1000,
          // })
          // .json({ message: `OTP đã được gửi đến ${email}` });
          .status(200)
          .json({
            data: { id, username, email, expiredAt },
            message: `OTP đã được gửi đến ${email}`,
          })
      );
    } catch (error) {
      next(createHttpError(500, error));
    }
  },
  verifyLogin: async (req, res, next) => {
    try {
      // const { id, username, email } = req.cookies.loginInfo;
      const { id, username, email, otp: userOTP } = req.body;

      if (!id) next(createHttpError(400, 'Bạn chưa thực hiện đầy đủ các bước đăng nhập'));

      const otp = otpService.getOne(username, email);
      if (!otp) next(createHttpError(400, 'Mã OTP không chính xác'));

      const sameOTP = bcrypt.compareSync(userOTP, otp);
      if (!sameOTP) next(createHttpError(400, 'Mã OTP không chính xác'));

      const user = userService.getOne({ username });
      if (!user) next(createHttpError(404, 'Không tìm thấy tài khoản'));

      const { role, ...others } = user;
      const token = jwt.sign({ id, role }, process.env.ACCESS_TOKEN_KEY);

      await otpService.delete(username, email);

      return res
        .clearCookie('loginInfo', {
          secure: true,
          sameSite: 'none',
        })
        .cookie('accessToken', token, {
          httpOnly: true,
        })
        .status(200)
        .json({ data: others });
    } catch (error) {
      next(createHttpError(500, error));
    }
  },
  forgotPassword: async (req, res, next) => {
    try {
      const { username, email } = req.body;
      const TOKEN_EXPIRED_TIME = 15;

      const user = await userService.getOne({ username });
      if (!user) next(createHttpError(404, 'Tài khoản không tồn tại'));

      if (user.email !== email) {
        next(createHttpError(403, 'Email không trùng khớp, vui lòng nhập lại'));
      }

      const payload = { id: user.id };
      const token = jwt.sign(payload, process.env.FORGOT_PASSWORD_TOKEN_KEY, {
        expiresIn: `${TOKEN_EXPIRED_TIME}m`,
      });

      const resetPasswordLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
      console.log(resetPasswordLink);

      authService.sendResetPasswordLink(email, TOKEN_EXPIRED_TIME, resetPasswordLink);

      const expiredAt = moment().add(TOKEN_EXPIRED_TIME, 'm').toISOString();

      return (
        res
          // .cookie('forgotPasswordToken', token, {
          //   httpOnly: true,
          //   maxAge: TOKEN_EXPIRED_TIME * 60 * 1000,
          // })
          .status(200)
          .json({
            data: { id: user.id, username, email, expiredAt },
            message: `Link thay đổi mật khẩu đã được gửi đến ${email}`,
          })
      );
    } catch (error) {
      next(createHttpError(500, error));
    }
  },
  resetPassword: async (req, res, next) => {
    try {
      const { token } = req.params;
      const { forgotPasswordToken } = req.cookies;
      const { userId, password } = req.body;

      if (!forgotPasswordToken) {
        next(createHttpError(401, 'Không thể thực hiện do không đủ quy trình thay đổi mật khẩu'));
      }
      if (forgotPasswordToken !== token) next(createHttpError(403, 'Token không hợp lệ'));

      jwt.verify(token, process.env.FORGOT_PASSWORD_TOKEN_KEY, async (error, userInfo) => {
        if (error) next(createHttpError(403, 'Token không hợp lệ'));

        if (userInfo.id !== userId) next(createHttpError(403, 'Token không hợp lệ'));

        const hashedPassword = authService.hashPassword(password);
        await userService.update(userInfo.id, { password: hashedPassword });

        return res.status(200).json({ message: 'Thay đổi mật khẩu thành công' });
      });
    } catch (error) {
      next(createHttpError(500, error));
    }
  },
};

export default authController;
