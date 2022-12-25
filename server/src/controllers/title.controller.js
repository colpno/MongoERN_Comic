import createHttpError from 'http-errors';
import transformQueryParams from '../helpers/transformQueryParams.js';
import { titleService } from '../services/index.js';

const titleController = {
  getAll: async (req, res, next) => {
    try {
      const { userInfo, query } = req;

      if (userInfo) query.userId = userInfo.id;

      const params = transformQueryParams(query);
      const response = await titleService.getAll(params);

      if (response.length === 0 || response.data?.length === 0) {
        next(createHttpError(404, 'Không tìm thấy truyện nào'));
      }

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },
  getOne: async (req, res, next) => {
    try {
      const { userInfo, params } = req;

      if (userInfo) params.userId = userInfo.id;

      const { id, userId } = params;
      const response = await titleService.getOne({ _id: id, userId });

      if (!response) {
        next(createHttpError(404, 'Không tìm thấy truyện nào'));
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
      const { userId } = req.userInfo;
      const {
        approvedStatusId,
        releaseDay,
        title,
        cover,
        author,
        summary,
        genres,
        coin,
        point,
        cloudPublicId,
      } = req.body;

      const duplicated = await titleService.getAll({ title });

      if (duplicated.length > 0) {
        next(createHttpError(409, 'Đã tồn tại tên truyện, vui lòng thay đổi'));
      }

      const response = await titleService.add(
        userId,
        approvedStatusId,
        releaseDay,
        title,
        cover,
        author,
        summary,
        genres,
        coin,
        point,
        cloudPublicId
      );

      if (!response) {
        next(createHttpError(400, 'Không thể hoàn thành việc tạo truyện'));
      }

      // TODO: store images in cloud

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
      const { userId } = req.userInfo;
      const {
        approvedStatusId,
        releaseDay,
        title,
        cover,
        author,
        summary,
        genres,
        coin,
        point,
        cloudPublicId,
      } = req.body;

      const response = await titleService.update(id, {
        userId,
        approvedStatusId,
        releaseDay,
        title,
        cover,
        author,
        summary,
        genres,
        coin,
        point,
        cloudPublicId,
      });

      if (!response) {
        next(createHttpError(400, 'không thể hoàn thành việc cập nhật truyện'));
      }

      // TODO: update images if need

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

      const response = await titleService.delete(id);

      if (!response) {
        next(createHttpError(400, 'không thể hoàn thành việc xóa truyện'));
      }

      // TODO: delete images in cloud

      return res.status(200).json({
        code: 200,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default titleController;
