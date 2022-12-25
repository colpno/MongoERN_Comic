import createHttpError from 'http-errors';
import transformQueryParams from '../helpers/transformQueryParams.js';
import { approvedStatusService } from '../services/index.js';

const approvedStatusController = {
  getAll: async (req, res, next) => {
    try {
      const params = transformQueryParams(req.query);
      const response = await approvedStatusService.getAll(params);

      if (response.length === 0 || response.data?.length === 0) {
        next(createHttpError(404, 'Không tìm thấy trạng thái nào'));
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
      const { id } = req.params;
      const response = await approvedStatusService.getOne({ _id: id });

      if (!response) {
        next(createHttpError(404, 'Không tìm thấy trạng thái nào'));
      }

      return res.status(200).json({
        code: 200,
        data: response,
      });
    } catch (error) {
      next();
    }
  },
  add: async (req, res, next) => {
    try {
      const { status } = req.body;

      const duplicated = await approvedStatusService.getAll({ status });

      if (duplicated.length > 0) {
        next(createHttpError(409, 'Đã tồn tại tên trạng thái, vui lòng thay đổi'));
      }

      const response = await approvedStatusService.add(status);

      if (!response) {
        next(createHttpError(400, 'Không thể hoàn thành việc tạo trạng thái'));
      }

      return res.status(201).json({
        code: 201,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const response = await approvedStatusService.update(id, {
        status,
      });

      if (!response) {
        next(createHttpError(400, 'không thể hoàn thành việc cập nhật trạng thái'));
      }

      return res.status(200).json({
        code: 200,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      const response = await approvedStatusService.delete(id);

      if (!response) {
        next(createHttpError(400, 'không thể hoàn thành việc xóa trạng thái'));
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

export default approvedStatusController;
