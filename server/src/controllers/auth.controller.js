import bcrypt from 'bcryptjs';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import moment from 'moment';

import { authService, otpService, userService } from '../services/index.js';

const otpSender = async (id, username, email) => {
  const TOKEN_EXPIRED_TIME = 15;
  const OTP_LENGTH = 4;

  const { otp } = otpService.generateOTP(OTP_LENGTH);
  console.log('file: auth.controller.js:47 ~ otp', otp);

  await otpService.add(username, email, otp);

  // otpService.sendViaMail(email, otp);

  const expiredAt = moment().add(TOKEN_EXPIRED_TIME, 'm').toISOString();

  return { id, username, email, expiredAt };
};

const authController = {
  verifyRegister: (req, res, next) => {
    try {
      const { token } = req.params;
      if (!token) return next(createError(401, 'Bạn không thể sử dụng chức năng này'));

      jwt.verify(token, process.env.REGISTER_TOKEN_KEY, async (error, userInfo) => {
        if (error) return next(createError(403, 'Token không hợp lệ'));

        await userService.update(userInfo.id, { isActivated: true });

        return res.status(200).json({
          code: 200,
          message: 'Kích hoạt tài khoản thành công',
        });
      });
    } catch (error) {
      return next(createError(500, error));
    }
  },
  logout: (req, res) => {
    res
      .clearCookie('accessToken', {
        secure: true,
        sameSite: 'none',
      })
      .status(200)
      .json({
        code: 200,
        message: 'Đăng xuất thành công',
      });
  },
  sendOTP: async (req, res, next) => {
    try {
      const { id, username, email } = req.body;
      const TOKEN_EXPIRED_TIME = 15;

      const { expiredAt } = await otpSender(id, username, email);
      const cookieData = JSON.stringify({ id, username, email, expiredAt });

      return res
        .clearCookie('loginInfo', {
          secure: true,
          sameSite: 'none',
        })
        .cookie('loginInfo', cookieData, {
          maxAge: TOKEN_EXPIRED_TIME * 60 * 1000,
        })
        .status(200)
        .json({
          code: 200,
          data: { id, username, email, expiredAt },
          message: `OTP đã được gửi đến ${email}`,
        });
    } catch (error) {
      return next(createError(500, error));
    }
  },
  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const TOKEN_EXPIRED_TIME = 15;

      const user = (await userService.getAll({ username })).data[0];
      if (!user) return next(createError(404, 'Sai tên đăng nhập'));

      if (!user.isActivated) {
        return res.status(403).json({
          status: 403,
          message:
            'Bạn đã bị cấm sử dụng dịch vụ của chúng tôi. Nếu có vấn đề nào, vui lòng liên hệ help@mail.domain',
        });
      }

      const { _id, email, password: userPassword } = user;

      const samePassword = bcrypt.compareSync(password, userPassword);
      if (!samePassword) return next(createError(401, 'Mật khẩu không chính xác'));

      const { expiredAt } = await otpSender(_id, username, email);
      const cookieData = JSON.stringify({ id: _id, username, email, expiredAt });

      return res
        .clearCookie('loginInfo', {
          secure: true,
          sameSite: 'none',
        })
        .cookie('loginInfo', cookieData, {
          maxAge: TOKEN_EXPIRED_TIME * 60 * 1000,
        })
        .status(200)
        .json({
          code: 200,
          data: { id: _id, username, email, expiredAt },
          message: `OTP đã được gửi đến ${email}`,
        });
    } catch (error) {
      return next(createError(500, error));
    }
  },
  verifyLogin: async (req, res, next) => {
    try {
      const { id, username, email, otp: userOTP } = req.body;

      if (!id && !username && !email) {
        return next(createError(400, 'Bạn chưa thực hiện đầy đủ các bước đăng nhập'));
      }

      const otp = await otpService.getOne(username, email);
      if (!otp) return next(createError(401, 'Mã OTP không chính xác'));

      const sameOTP = bcrypt.compareSync(userOTP, otp.code);
      if (!sameOTP) return next(createError(401, 'Mã OTP không chính xác'));

      const user = await userService.getOne({ username });
      if (!user) return next(createError(404, 'Không tìm thấy tài khoản'));

      const { isActivated, role, password, ...others } = user._doc;
      const token = jwt.sign({ id: user._id, role, isActivated }, process.env.ACCESS_TOKEN_KEY);

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
        .json({
          code: 200,
          data: others,
        });
    } catch (error) {
      return next(createError(500, error));
    }
  },
  forgotPassword: async (req, res, next) => {
    try {
      const { username, email } = req.body;
      const TOKEN_EXPIRED_TIME = 15;

      const user = await userService.getOne({ username });
      if (!user) return next(createError(404, 'Tài khoản không tồn tại'));

      if (user.email !== email) {
        return next(createError(401, 'Email không trùng khớp, vui lòng nhập lại'));
      }

      const payload = { id: user.id };
      const token = jwt.sign(payload, process.env.FORGOT_PASSWORD_TOKEN_KEY, {
        expiresIn: `${TOKEN_EXPIRED_TIME}m`,
      });

      const resetPasswordLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
      console.log(resetPasswordLink);

      // authService.sendResetPasswordLink(email, TOKEN_EXPIRED_TIME, resetPasswordLink);

      const expiredAt = moment().add(TOKEN_EXPIRED_TIME, 'm').toISOString();

      return (
        res
          // .cookie('forgotPasswordToken', token, {
          //   httpOnly: true,
          //   maxAge: TOKEN_EXPIRED_TIME * 60 * 1000,
          // })
          .status(200)
          .json({
            code: 200,
            data: { id: user.id, username, email, expiredAt },
            message: `Link thay đổi mật khẩu đã được gửi đến ${email}`,
          })
      );
    } catch (error) {
      return next(createError(500, error));
    }
  },
  resetPassword: async (req, res, next) => {
    try {
      const { token } = req.params;
      const { password } = req.body;

      // if (!forgotPasswordToken) {
      //   return next(
      //     createError(401, 'Không thể thực hiện do không đủ quy trình thay đổi mật khẩu')
      //   );
      // }
      // if (forgotPasswordToken !== token) return next(createError(403, 'Token không hợp lệ'));

      jwt.verify(token, process.env.FORGOT_PASSWORD_TOKEN_KEY, async (error, userInfo) => {
        if (error) return next(createError(403, 'Token không hợp lệ'));

        // if (userInfo.id !== userId) return next(createError(403, 'Token không hợp lệ'));

        const hashedPassword = authService.hashPassword(password);
        await userService.update(userInfo.id, { password: hashedPassword });

        return res.status(200).json({
          code: 200,
          message: 'Thay đổi mật khẩu thành công',
        });
      });
    } catch (error) {
      return next(createError(500, error));
    }
  },
};

export default authController;
