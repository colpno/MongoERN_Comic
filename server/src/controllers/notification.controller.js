import createError from 'http-errors';
import transformQueryParams from '../helpers/transformQueryParams.js';
import { notificationService } from '../services/index.js';

const notificationController = {
  getAll: async (req, res, next) => {
    try {
      const params = transformQueryParams(req.query);
      const response = await notificationService.getAll(params);

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
      const { id } = req.params;
      const params = transformQueryParams(req.query);
      const match = { ...params, _id: id };

      const response = await notificationService.getOne(match);

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
      return next(error);
    }
  },
  add: async (req, res, next) => {
    try {
      const { cover, title, subTitle, content } = req.body;

      const response = await notificationService.add(cover, title, subTitle, content);

      if (!response) {
        return next(createError(400, 'Không thể hoàn thành việc tạo thông báo'));
      }

      return res.status(201).json({
        code: 201,
        message: 'Đã lưu thông báo',
        data: response,
      });
    } catch (error) {
      return next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { cover, title, subTitle, content } = req.body;

      const response = await notificationService.update(
        { _id: id },
        { cover, title, subTitle, content }
      );

      if (!response) {
        return next(createError(400, 'Không thể hoàn thành việc thay đổi thông báo'));
      }

      return res.status(201).json({
        code: 201,
        message: 'Đã lưu thông báo',
        data: response,
      });
    } catch (error) {
      return next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.query;

      const response = await notificationService.delete(id);

      if (!response) {
        return next(createError(400, 'không thể hoàn thành việc xóa'));
      }

      return res.status(200).json({
        code: 200,
        data: response,
      });
    } catch (error) {
      return next(error);
    }
  },
};

export default notificationController;
