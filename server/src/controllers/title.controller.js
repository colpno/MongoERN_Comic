import { randomUUID } from 'crypto';
import createError from 'http-errors';

import transformQueryParams from '../helpers/transformQueryParams.js';
import { titleService } from '../services/index.js';

const titleController = {
  getAll: async (req, res, next) => {
    try {
      const { userInfo, query } = req;

      if (userInfo) query.user_id = userInfo.id;

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
      if (req.userInfo) req.params.user_id = req.userInfo?.id;

      const { id } = req.params;
      const params = transformQueryParams(req.query);
      const match = { ...params, _id: id };

      const response = await titleService.getOne(match);

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
  random: async (req, res, next) => {
    try {
      const params = transformQueryParams(req.query);

      const titles = await titleService.random(params);

      if (titles.length === 0) {
        return res.status(200).json({
          code: 404,
          message: 'Không tìm thấy truyện nào',
          data: [],
        });
      }

      return res.status(200).json({
        code: 200,
        data: titles,
      });
    } catch (error) {
      next(error);
    }
  },
  add: async (req, res, next) => {
    try {
      const { id: userId } = req.userInfo;
      const { release_day, title, status_id, cover, author, summary, genres, coin, point } =
        req.body;

      const duplicated = (await titleService.getAll({ title })).data;

      if (duplicated.length > 0) {
        return next(createError(409, 'Đã tồn tại tên truyện, vui lòng thay đổi'));
      }

      const guid = randomUUID();

      const finalCover = await titleService.uploadToCloud(cover, guid);

      const response = await titleService.add(
        userId,
        release_day,
        title,
        status_id,
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
      const {
        releaseDay,
        title,
        status,
        cover,
        author,
        summary,
        genres,
        coin,
        point,
        oldCover,
        guid,
        approved_status_id,
        status_id,
        comment_num,
        like,
        view,
        total_chapter,
      } = req.body;

      const finalCover = await titleService.uploadToCloud(cover, guid);

      const response = await titleService.update(id, {
        user_id: userId,
        release_day: releaseDay,
        title,
        status,
        cover: finalCover,
        author,
        summary,
        genres,
        coin,
        point,
        approved_status_id,
        status_id,
        comment_num,
        like,
        view,
        total_chapter,
      });

      if (!response) {
        return next(createError(400, 'không thể hoàn thành việc cập nhật truyện'));
      }

      cover && (await titleService.removeFromCloud(oldCover.cloud_public_id));

      return res.status(200).json({
        code: 200,
        message: 'Hoàn tất thay đổi thông tin',
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
