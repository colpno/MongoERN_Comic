import createError from 'http-errors';
import jwt from 'jsonwebtoken';

import transformQueryParams from '../helpers/transformQueryParams.js';
import { authService, userService } from '../services/index.js';

const userController = {
  getAll: async (req, res, next) => {
    try {
      const params = transformQueryParams(req.query);

      const response = await userService.getAll(params);

      if (response.length === 0 || response.data?.length === 0) {
        return res.status(200).json({
          ...response,
          code: 200,
        });
      }

      return res.status(200).json({
        ...response,
        code: 200,
      });
    } catch (error) {
      return next(error);
    }
  },
  getOne: async (req, res, next) => {
    try {
      const { id } = req.userInfo;
      const params = transformQueryParams(req.query);

      const response = await userService.getOne({ ...params, _id: id });

      if (!response) {
        return res.status(200).json({
          code: 200,
          data: {},
        });
      }

      return res.status(200).json({
        code: 200,
        data: response,
      });
    } catch (error) {
      return next();
    }
  },
  register: async (req, res, next) => {
    try {
      const { username, password, avatar, email, role } = req.body;

      const duplicated = (await userService.getAll({ username })).data;

      if (duplicated.length > 0) {
        return next(createError(409, 'Đã tồn tại tên tài khoản, vui lòng thay đổi'));
      }

      const response = await userService.register(username, password, avatar, email, role);

      if (!response) {
        return next(createError(400, 'Không thể hoàn thành việc tạo tài khoản'));
      }

      const TOKEN_EXPIRED_TIME = 15;
      const payload = { id: response._id };
      const token = jwt.sign(payload, process.env.REGISTER_TOKEN_KEY, {
        expiresIn: `${TOKEN_EXPIRED_TIME}m`,
      });

      const activeAccountLink = `${process.env.CLIENT_URL}/register/verify/${token}`;
      authService.sendActiveAccountLink(email, TOKEN_EXPIRED_TIME, activeAccountLink);

      return res.status(201).json({
        code: 201,
        data: response,
        message: `Link kích hoạt tài khoản đã được gửi đến ${email}`,
      });
    } catch (error) {
      return next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { userInfo, body } = req;
      const {
        _id,
        username,
        password,
        avatar,
        email,
        role,
        dateOfBirth,
        isBanned,
        isActivated,
        paypalEmail,
        coin,
        point,
        rentingTicket,
        purchasingTicket,
      } = body;

      if (_id) userInfo.id = _id;

      const response = await userService.update(userInfo.id, {
        username,
        password,
        avatar,
        email,
        role,
        dateOfBirth,
        isBanned,
        isActivated,
        coin,
        point,
        ticket_for_renting: rentingTicket,
        ticket_for_buying: purchasingTicket,
        date_of_birth: dateOfBirth,
        paypal_email: paypalEmail,
      });

      if (!response) {
        return next(createError(400, 'không thể hoàn thành việc cập nhật tài khoản'));
      }

      return res.status(200).json({
        code: 200,
        data: response,
        message: 'Cập nhật thành công',
      });
    } catch (error) {
      return next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const params = transformQueryParams(req.query);

      const response = await userService.delete(params);

      if (!response) {
        return next(createError(400, 'không thể hoàn thành việc xóa tài khoản'));
      }

      return res.status(200).json({
        code: 200,
        data: response,
        message: 'Xóa thành công',
      });
    } catch (error) {
      return next(error);
    }
  },
};

export default userController;
