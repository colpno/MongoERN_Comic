import createError from 'http-errors';
import transformQueryParams from '../helpers/transformQueryParams.js';
import { genreService } from '../services/index.js';

const genreController = {
  getAll: async (req, res, next) => {
    try {
      const params = transformQueryParams(req.query);
      const response = await genreService.getAll(params);

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
      const response = await genreService.getOne({ _id: id });

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
      const { name } = req.body;

      const duplicated = (await genreService.getAll({ name })).data;

      if (duplicated.length > 0) {
        return next(createError(409, 'Đã tồn tại tên thể loại, vui lòng thay đổi'));
      }

      const response = await genreService.add(name);

      if (!response) {
        return next(createError(400, 'Không thể hoàn thành việc tạo thể loại'));
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
      const { name } = req.body;

      const response = await genreService.update(id, {
        name,
      });

      if (!response) {
        return next(createError(400, 'không thể hoàn thành việc cập nhật thể loại'));
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

      const response = await genreService.delete(id);

      if (!response) {
        return next(createError(400, 'không thể hoàn thành việc xóa thể loại'));
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

export default genreController;
