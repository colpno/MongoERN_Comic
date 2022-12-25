import createHttpError from 'http-errors';
import transformQueryParams from '../helpers/transformQueryParams.js';
import { paymentMethodService } from '../services/index.js';

const paymentMethodController = {
  getAll: async (req, res, next) => {
    try {
      const params = transformQueryParams(req.query);
      const response = await paymentMethodService.getAll(params);

      if (response.length === 0 || response.data?.length === 0) {
        next(createHttpError(404, 'Không tìm thấy phương thức thanh toán nào'));
      }

      return res.status(200).json({
        code: 200,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  add: async (req, res, next) => {
    try {
      const { name } = req.body;

      const duplicated = await paymentMethodService.getAll({ name });

      if (duplicated.length > 0) {
        next(createHttpError(409, 'Đã tồn tại tên phương thức thanh toán, vui lòng thay đổi'));
      }

      const response = await paymentMethodService.add(name);

      if (!response) {
        next(createHttpError(400, 'Không thể hoàn thành việc tạo phương thức thanh toán'));
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
      const { name } = req.body;

      const response = await paymentMethodService.update(id, {
        name,
      });

      if (!response) {
        next(createHttpError(400, 'không thể hoàn thành việc cập nhật phương thức thanh toán'));
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

      const response = await paymentMethodService.delete(id);

      if (!response) {
        next(createHttpError(400, 'không thể hoàn thành việc xóa phương thức thanh toán'));
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

export default paymentMethodController;
