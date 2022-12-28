import { randomUUID } from 'crypto';
import createError from 'http-errors';

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
      const { userInfo, params } = req;

      if (userInfo) params.userId = userInfo.id;

      const { id, userId } = params;
      const response = await titleService.getOne({ _id: id, userId });

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
      const { id: userId } = req.userInfo;
      const { releaseDay, title, cover, author, summary, genres, coin, point } = req.body;

      const duplicated = (await titleService.getAll({ title })).data;

      if (duplicated.length > 0) {
        return next(createError(409, 'Đã tồn tại tên truyện, vui lòng thay đổi'));
      }

      const guid = randomUUID();

      const finalCover = await titleService.uploadToCloud(cover, guid);

      const response = await titleService.add(
        userId,
        releaseDay,
        title,
        finalCover,
        author,
        summary,
        genres,
        coin,
        point,
        guid
      );

      if (!response) {
        return next(createError(400, 'Không thể hoàn thành việc tạo truyện'));
      }

      return res.status(201).json({
        code: 201,
        message: 'Truyện đã được thêm thành công',
        data: response,
      });
    } catch (error) {
      return next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { userId } = req.userInfo;
      const { releaseDay, title, cover, author, summary, genres, coin, point, oldCover, guid } =
        req.body;

      const finalCover = await titleService.uploadToCloud(cover, guid);

      const response = await titleService.update(id, {
        user_id: userId,
        release_day: releaseDay,
        title,
        cover: finalCover,
        author,
        summary,
        genres,
        coin,
        point,
      });

      if (!response) {
        return next(createError(400, 'không thể hoàn thành việc cập nhật truyện'));
      }

      cover && (await titleService.removeFromCloud(oldCover.cloud_public_id));

      return res.status(200).json({
        code: 200,
        message: 'Truyện đã được cập nhật thành công',
        data: response,
      });
    } catch (error) {
      return next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      const response = await titleService.delete(id);

      if (!response) {
        return next(createError(400, 'không thể hoàn thành việc xóa truyện'));
      }

      await titleService.removeFromCloud(response.cover.cloud_public_id);

      return res.status(200).json({
        code: 200,
        data: response,
        message: 'Truyện đã được xóa thành công',
      });
    } catch (error) {
      return next(error);
    }
  },
};

export default titleController;
