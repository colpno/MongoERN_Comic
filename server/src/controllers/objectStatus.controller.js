import createError from 'http-errors';
import transformQueryParams from '../helpers/transformQueryParams.js';
import { objectStatusService } from '../services/index.js';

const objectStatusController = {
  getAll: async (req, res, next) => {
    try {
      const params = transformQueryParams(req.query);
      const response = await objectStatusService.getAll(params);

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
      const response = await objectStatusService.getOne({ _id: id });

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
  add: async (req, res, next) => {
    try {
      const { status } = req.body;

      const duplicated = await objectStatusService.getAll({ status });

      if (duplicated.length > 0) {
        return next(createError(409, 'Đã tồn tại tên trạng thái, vui lòng thay đổi'));
      }

      const response = await objectStatusService.add(status);

      if (!response) {
        return next(createError(400, 'Không thể hoàn thành việc tạo trạng thái'));
      }

      return res.status(201).json({
        code: 201,
        data: response,
      });
    } catch (error) {
      return next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const response = await objectStatusService.update(id, {
        status,
      });

      if (!response) {
        return next(createError(400, 'không thể hoàn thành việc cập nhật trạng thái'));
      }

      return res.status(200).json({
        code: 200,
        data: response,
      });
    } catch (error) {
      return next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      const response = await objectStatusService.delete(id);

      if (!response) {
        return next(createError(400, 'không thể hoàn thành việc xóa trạng thái'));
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

export default objectStatusController;
