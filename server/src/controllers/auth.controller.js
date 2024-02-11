import bcrypt from 'bcryptjs';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import moment from 'moment';

import { authService, otpService, userService } from '../services/index.js';
import { secureEmail } from '../helpers/secureEmail.js';

const otpSender = async (id, username, email) => {
  const TOKEN_EXPIRED_TIME = 15;
  const OTP_LENGTH = 4;

  const { otp } = otpService.generateOTP(OTP_LENGTH);
  console.log('file: auth.controller.js:47 ~ otp', otp);

  const response = await await otpService.add(username, email, otp);

  // otpService.sendViaMail(email, otp);

  const expiredAt = moment().add(TOKEN_EXPIRED_TIME, 'm').toISOString();

  return { id, username, email, expiredAt, oid: response._id, otp };
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
        httpOnly: true,
        sameSite: 'none',
        secure: true,
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
        .cookie('loginInfo', cookieData, {
          maxAge: TOKEN_EXPIRED_TIME * 60 * 1000,
          sameSite: 'none',
          secure: true,
        })
        .status(200)
        .json({
          code: 200,
          data: {
            id,
            username,
            email,
            expiredAt,
            cookie: {
              name: 'loginInfo',
              payload: cookieData,
              options: {
                expires: TOKEN_EXPIRED_TIME * 60 * 1000,
                sameSite: 'none',
                secure: true,
              },
            },
          },
          message: `OTP đã được gửi đến ${email}`,
        });
    } catch (error) {
      return next(createError(500, error));
    }
  },
  login: async (req, res, next) => {
    try {
      const { username, password, security_token } = req.body;
      const TOKEN_EXPIRED_TIME = 15;

      const user = (await userService.getAll({ username })).data[0];

      if (!user) return next(createError(404, 'Sai tên đăng nhập'));

      if (user.isBanned) {
        return res.status(403).json({
          status: 403,
          message:
            'Bạn đã bị cấm sử dụng dịch vụ của chúng tôi. Nếu có vấn đề nào, vui lòng liên hệ help@mail.domain',
        });
      }

      if (!user.isActivated) {
        return res.status(403).json({
          status: 403,
          message:
            'Tài khoản chưa được kích hoạt. Vui lòng kích hoạt tài khoản trước khi đăng nhập.',
        });
      }

      const { _id, email, password: userPassword, role } = user;

      if (security_token) {
        const isAdminRequest = await bcrypt.compare(process.env.MANAGER_TOKEN_KEY, security_token);
        if (isAdminRequest && role !== 'administrator') {
          return next(createError(409, 'Bạn không có quyền để truy cập'));
        }
      }

      const samePassword = bcrypt.compareSync(password, userPassword);
      if (!samePassword) return next(createError(401, 'Mật khẩu không chính xác'));

      const { expiredAt, oid, otp } = await otpSender(_id, username, email);
      const cookieData = JSON.stringify({
        id: _id,
        oid,
        username,
        email: secureEmail(email),
        expiredAt,
      });

      return res
        .cookie('loginInfo', cookieData, {
          maxAge: TOKEN_EXPIRED_TIME * 60 * 1000,
          sameSite: 'none',
          secure: true,
        })
        .status(200)
        .json({
          code: 200,
          // data: { id: _id, username, email, expiredAt },
          data: {
            id: _id,
            username,
            email,
            expiredAt,
            otp,
            cookie: {
              name: 'loginInfo',
              payload: cookieData,
              options: {
                expires: TOKEN_EXPIRED_TIME * 60 * 1000,
                sameSite: 'none',
                secure: true,
              },
            },
          },
          message: `OTP đã được gửi đến ${email}`,
        });
    } catch (error) {
      return next(createError(500, error));
    }
  },
  verifyLogin: async (req, res, next) => {
    try {
      const { id, username, email, otp: userOTP, oid } = req.body;

      if (!id && !username && !email) {
        return next(createError(400, 'Bạn chưa thực hiện đầy đủ các bước đăng nhập'));
      }

      const otp = await otpService.getOne({ _id: oid });
      if (!otp) return next(createError(401, 'Mã OTP không chính xác'));

      const sameOTP = bcrypt.compareSync(userOTP, otp.code);
      if (!sameOTP) return next(createError(401, 'Mã OTP không chính xác'));

      const user = await userService.getOne({ username, _id: id });
      if (!user) return next(createError(404, 'Không tìm thấy tài khoản'));

      const { income, isBanned, isActivated, password, role, ...others } = user._doc;
      const token = jwt.sign({ id: user._id, role, isActivated }, process.env.ACCESS_TOKEN_KEY);

      await otpService.delete(username, email);

      return res
        .clearCookie('loginInfo', {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        })
        .cookie('accessToken', token, {
          sameSite: 'none',
          secure: true,
        })
        .status(200)
        .json({
          code: 200,
          data: {
            ...others,
            role,
            cookie: {
              name: 'accessToken',
              payload: token,
              options: {
                sameSite: 'none',
                secure: true,
              },
            },
          },
          message: 'Đăng nhập thành công',
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

      authService.sendResetPasswordLink(email, TOKEN_EXPIRED_TIME, resetPasswordLink);

      return res
        .cookie('forgotPasswordToken', token, {
          sameSite: 'none',
          secure: true,
          maxAge: TOKEN_EXPIRED_TIME * 60 * 1000,
        })
        .status(200)
        .json({
          code: 200,
          message: `Link thay đổi mật khẩu đã được gửi đến ${email}`,
          data: {
            cookie: {
              name: 'forgotPasswordToken',
              payload: token,
              options: {
                sameSite: 'none',
                secure: true,
                expires: TOKEN_EXPIRED_TIME * 60 * 1000,
              },
            },
          },
        });
    } catch (error) {
      return next(createError(500, error));
    }
  },
  resetPassword: async (req, res, next) => {
    try {
      const { token } = req.params;
      const { password } = req.body;

      jwt.verify(token, process.env.FORGOT_PASSWORD_TOKEN_KEY, async (error, userInfo) => {
        if (error) return next(createError(403, 'Token không hợp lệ'));

        const { id } = userInfo;

        const hashedPassword = authService.hashPassword(password);
        const response = await userService.update(id, { password: hashedPassword });

        if (!response) return next(createError(403, 'Token không hợp lệ'));

        return res
          .clearCookie('forgotPasswordToken', {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
          })
          .status(200)
          .json({
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
