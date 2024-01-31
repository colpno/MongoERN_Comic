import { randomUUID } from 'crypto';
import createError from 'http-errors';

import transformQueryParams from '../helpers/transformQueryParams.js';
import { chapterService, cloudinaryService, titleService } from '../services/index.js';
import chapterReportController from './chapterReport.controller.js';
import titleReportController from './titleReport.controller.js';

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
      const { id } = req.params;
      const params = transformQueryParams(req.query);

      const response = await chapterService.getOne({ ...params, _id: id });

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
      const { titleId, title, cover, contents, order, cost, status_id } = req.body;
      const { id: userId } = req.userInfo;

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
        guid,
        status_id,
        userId
      );

      if (!response) {
        return next(createError(400, 'Không thể hoàn thành việc tạo chương'));
      }

      await titleService.update(titleId, { $inc: { total_chapter: 1 } });

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
      const { titleId, title, cover, status_id, approved_status_id, contents, order, cost, guid } =
        req.body;
      const newContents = contents?.new ? contents.new : undefined;
      const oldContents = contents?.remove ? contents.remove : undefined;

      const { finalCover, finalContents } =
        cover || newContents
          ? await chapterService.uploadToCloud(cover, newContents, titleId, guid)
          : { finalCover: undefined, finalContents: undefined };

      const response = await chapterService.update(id, {
        title,
        cover: finalCover,
        status_id,
        approved_status_id,
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
        data: response,
        message: 'Hoàn tất thay đổi thông tin',
      });
    } catch (error) {
      return next(error);
    }
  },
  updateView: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { view } = req.body;
      const whiteListValues = [-1, 0, 1];

      if (view && !whiteListValues.includes(view)) {
        return res.status(400).json({ code: 400, message: 'Dữ liệu không hợp lệ' });
      }

      const chapter = await chapterService.getOne({ _id: id });

      const chapterPromise = chapterService.increaseView(id);
      const titlePromise = titleService.increaseView(chapter.title_id);
      const chapterReportPromise = chapterReportController.add(id, view, 0);
      const titleReportPromise = titleReportController.add(chapter.title_id, view, 0);
      await Promise.all([chapterPromise, titlePromise, chapterReportPromise, titleReportPromise]);

      return res.status(200).json({ code: 200 });
    } catch (error) {
      return next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const params = transformQueryParams(req.query);

      const response = await chapterService.delete(params);

      if (!response) {
        return next(createError(400, 'không thể hoàn thành việc xóa chương'));
      }

      const title = await titleService.getOne({ _id: response.title_id });

      await cloudinaryService.remove(`comic/titles/${title._guid}/chapters/${response._guid}`);

      await titleService.update(response.title_id, { $inc: { total_chapter: -1 } });

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
