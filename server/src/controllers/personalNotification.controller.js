import createError from 'http-errors';
import transformQueryParams from '../helpers/transformQueryParams.js';
import { personalNotificationService } from '../services/index.js';

const personalNotificationController = {
  getAll: async (req, res, next) => {
    try {
      const params = transformQueryParams(req.query);
      const response = await personalNotificationService.getAll(params);

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
  add: async (req, res, next) => {
    try {
      const { user_id, text } = req.body;

      const response = await personalNotificationService.add(user_id, text);

      if (!response) {
        return next(createError(400, 'Không thể hoàn thành việc tạo theo dõi'));
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
      const { text, read_at } = req.body;

      const response = await personalNotificationService.update({ _id: id }, { text, read_at });

      if (!response) {
        return next(createError(400, 'Không thể hoàn thành việc tạo theo dõi'));
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
      const params = transformQueryParams(req.query);

      const response = await personalNotificationService.delete(params);

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

export default personalNotificationController;
