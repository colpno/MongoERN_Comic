import createHttpError from 'http-errors';
import transformQueryParams from '../helpers/transformQueryParams.js';
import { genreService } from '../services/index.js';

const genreController = {
  getAll: async (req, res, next) => {
    try {
      const params = transformQueryParams(req.query);
      const response = await genreService.getAll(params);

      if (response.length === 0 || response.data?.length === 0) {
        next(createHttpError(404, 'Không tìm thấy thể loại nào'));
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
      const response = await genreService.getOne({ _id: id });

      if (!response) {
        next(createHttpError(404, 'Không tìm thấy thể loại nào'));
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
      const { name } = req.body;

      const duplicated = await genreService.getAll({ name });

      if (duplicated.length > 0) {
        next(createHttpError(409, 'Đã tồn tại tên thể loại, vui lòng thay đổi'));
      }

      const response = await genreService.add(name);

      if (!response) {
        next(createHttpError(400, 'Không thể hoàn thành việc tạo thể loại'));
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

      const response = await genreService.update(id, {
        name,
      });

      if (!response) {
        next(createHttpError(400, 'không thể hoàn thành việc cập nhật thể loại'));
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

      const response = await genreService.delete(id);

      if (!response) {
        next(createHttpError(400, 'không thể hoàn thành việc xóa thể loại'));
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

export default genreController;
