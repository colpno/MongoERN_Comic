import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';

import transformQueryParams from '../helpers/transformQueryParams.js';
import { authService, userService } from '../services/index.js';

const userController = {
  getAll: async (req, res, next) => {
    try {
      const params = transformQueryParams(req.query);
      const response = await userService.getAll(params);

      if (response.length === 0 || response.data?.length === 0) {
        next(createHttpError(404, 'Không tìm thấy tài khoản nào'));
      }

      return res.status(200).json({
        code: 200,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  getOne: async (req, res, next) => {
    try {
      const { id } = req.userInfo;
      const response = await userService.getOne({ _id: id });

      if (!response) {
        next(createHttpError(404, 'Không tìm thấy tài khoản nào'));
      }

      return res.status(200).json({
        data: response,
      });
    } catch (error) {
      next();
    }
  },
  register: async (req, res, next) => {
    try {
      const { username, password, avatar, email, role, dateOfBirth } = req.body;

      const duplicated = await userService.getAll({ username });

      if (duplicated.length > 0) {
        next(createHttpError(409, 'Đã tồn tại tên tài khoản, vui lòng thay đổi'));
      }

      const response = await userService.register(
        username,
        password,
        avatar,
        email,
        role,
        dateOfBirth
      );

      if (!response) {
        next(createHttpError(400, 'Không thể hoàn thành việc tạo tài khoản'));
      }

      const TOKEN_EXPIRED_TIME = 15;
      const payload = { id: response._id };
      const token = jwt.sign(payload, process.env.FORGOT_PASSWORD_TOKEN_KEY, {
        expiresIn: `${TOKEN_EXPIRED_TIME}m`,
      });

      const activeAccountLink = `${process.env.CLIENT_URL}/register/verify/${token}`;
      authService.sendActiveAccountLink(email, TOKEN_EXPIRED_TIME, activeAccountLink);

      return res.status(201).json({
        code: 201,
        message: `Link kích hoạt tài khoản đã được gửi đến ${email}`,
      });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.userInfo;
      const { username, password, avatar, email, role, dateOfBirth } = req.body;

      const response = await userService.update(id, {
        username,
        password,
        avatar,
        email,
        role,
        dateOfBirth,
      });

      if (!response) {
        next(createHttpError(400, 'không thể hoàn thành việc cập nhật tài khoản'));
      }

      return res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.userInfo;

      const response = await userService.delete(id);

      if (!response) {
        next(createHttpError(400, 'không thể hoàn thành việc xóa tài khoản'));
      }

      return res.status(200).json({
        code: 200,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default userController;
