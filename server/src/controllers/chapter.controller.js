import createHttpError from 'http-errors';

import transformQueryParams from '../helpers/transformQueryParams.js';
import { chapterService, titleService } from '../services/index.js';

const chapterController = {
  getAll: async (req, res, next) => {
    try {
      const { userInfo, query } = req;

      if (userInfo) query.userId = userInfo.id;

      const params = transformQueryParams(query);
      const response = await chapterService.getAll(params);

      if (response.length === 0 || response.data?.length === 0) {
        next(createHttpError(404, 'Không tìm thấy chương nào'));
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
      const { userInfo, params } = req;

      if (userInfo) params.userId = userInfo.id;

      const { id, userId } = params;
      const response = await chapterService.getOne({ _id: id, userId });

      if (!response) {
        next(createHttpError(404, 'Không tìm thấy chương nào'));
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
      const { titleId, approvedStatusId, title, cover, contents, order, cost, cloudPublicId } =
        req.body;

      const response = await chapterService.add(
        titleId,
        approvedStatusId,
        title,
        cover,
        contents,
        order,
        cost,
        cloudPublicId
      );

      if (!response) {
        next(createHttpError(400, 'Không thể hoàn thành việc tạo chương'));
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
      const {
        titleId,
        approvedStatusId,
        title,
        cover,
        contents,
        order,
        cost,
        cloudPublicId,
        views,
        likes,
      } = req.body;

      if (views) {
        await titleService.increaseView(titleId);
        return res.status(200);
      }
      if (likes) {
        await titleService.increaseLike(titleId);
        return res.status(200);
      }

      const response = await chapterService.update(id, {
        approvedStatusId,
        title,
        cover,
        contents,
        order,
        cost,
        cloudPublicId,
        views,
        likes,
      });

      if (!response) {
        next(createHttpError(400, 'không thể hoàn thành việc cập nhật chương'));
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

      const response = await chapterService.delete(id);

      if (!response) {
        next(createHttpError(400, 'không thể hoàn thành việc xóa chương'));
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

export default chapterController;
