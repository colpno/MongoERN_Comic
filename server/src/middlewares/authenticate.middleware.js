import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import createHttpError from 'http-errors';

dotenv.config();

const { ACCESS_TOKEN_KEY } = process.env;

export const isAuthenticated = (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    next(createHttpError(401, 'Cần đăng nhập để sử dụng chức năng này'));
  }

  jwt.verify(accessToken, ACCESS_TOKEN_KEY, (error, userInfo) => {
    if (error) next(createHttpError(403, 'Token không hợp lệ'));

    req.userInfo = userInfo;
  });

  next();
};

export const isAdmin = (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    next(createHttpError(401, 'Cần đăng nhập để sử dụng chức năng này'));
  }

  jwt.verify(accessToken, ACCESS_TOKEN_KEY, (error, userInfo) => {
    if (error) next(createHttpError(403, 'Token không hợp lệ'));

    if (userInfo.role === 'member') next(createHttpError(401, 'Bạn không phải là quản trị viên'));

    req.userInfo = userInfo;
  });

  next();
};
