/* eslint-disable no-unused-vars */
import { randomUUID } from 'crypto';
import createError from 'http-errors';

import transformQueryParams from '../helpers/transformQueryParams.js';
import { chapterService, cloudinaryService, titleService } from '../services/index.js';

const chapterController = {
  getAll: async (req, res, next) => {
    try {
      const { query } = req;

      const params = transformQueryParams(query);
      const response = await chapterService.getAll(params);

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
      const { params } = req;

      const { id } = params;
      const response = await chapterService.getOne({ _id: id });

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
      const { titleId, title, cover, contents, order, cost } = req.body;

      const guid = randomUUID();

      const { finalCover, finalContents } = await chapterService.uploadToCloud(
        cover,
        contents,
        titleId,
        guid
      );

      const response = await chapterService.add(
        titleId,
        title,
        finalCover,
        finalContents,
        order,
        cost,
        guid
      );

      if (!response) {
        return next(createError(400, 'Không thể hoàn thành việc tạo chương'));
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
      const { titleId, title, cover, contents, order, cost, guid } = req.body;
      const { new: newContents, remove: oldContents } = contents;

      const { finalCover, finalContents } = await chapterService.uploadToCloud(
        cover,
        newContents,
        titleId,
        guid
      );

      const response = await chapterService.update(id, {
        title,
        cover: finalCover,
        contents: finalContents,
        order,
        cost,
      });

      if (!response) {
        return next(createError(400, 'không thể hoàn thành việc cập nhật chương'));
      }

      (cover || oldContents) &&
        (await chapterService.removeFromCloud(
          cover ? response.cover.cloud_public_id : undefined,
          oldContents
        ));

      return res.status(200).json({
        code: 200,
        message: 'Chương đã được cập nhật thành công',
      });
    } catch (error) {
      return next(error);
    }
  },
  updateView: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { view, like } = req.body;

      const response = await chapterService.update(id, {
        view,
        like,
      });

      if (view) {
        await titleService.increaseView(response.title_id);
        return res.status(200);
      }

      await titleService.increaseLike(response.title_id);
      return res.status(200);
    } catch (error) {
      return next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      const response = await chapterService.delete(id);

      if (!response) {
        return next(createError(400, 'không thể hoàn thành việc xóa chương'));
      }

      const title = await titleService.getOne({ _id: response.title_id });

      await cloudinaryService.remove(`comic/titles/${title._guid}/chapters/${response._guid}`);

      return res.status(200).json({
        code: 200,
        data: response,
      });
    } catch (error) {
      return next(error);
    }
  },
};

export default chapterController;