import createError from 'http-errors';
import moment from 'moment';
import transformQueryParams from '../helpers/transformQueryParams.js';
import { readingHistoryService } from '../services/index.js';

const readingHistoryController = {
  getAll: async (req, res, next) => {
    try {
      const { id: userId } = req.userInfo;
      req.query.user_id = userId;

      const params = transformQueryParams(req.query);
      const response = await readingHistoryService.getAll(params);

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
  add: async (req, res, next) => {
    try {
      const { id: userId } = req.userInfo;
      const { titleId, chapterId } = req.body;

      const duplicated = (
        await readingHistoryService.getAll({ user_id: userId, title_id: titleId })
      ).data;

      if (duplicated.length > 0) {
        const match = { user_id: userId, title_id: titleId };

        if (duplicated[0].chapter_id === chapterId) {
          match.chapter_id = chapterId;
          await readingHistoryService.update(match, {
            updatedAt: moment().toISOString(),
          });
          return res.status(200).json({ code: 200 });
        }

        const response = await readingHistoryService.update(match, {
          chapter_id: chapterId,
        });

        if (!response) {
          return next(createError(400, 'không thể hoàn thành việc cập nhật lịch sử đọc'));
        }

        return res.status(200).json({
          code: 200,
        });
      }

      const response = await readingHistoryService.add(userId, titleId, chapterId);

      if (!response) {
        return next(createError(400, 'Không thể hoàn thành việc tạo lịch sử đọc'));
      }

      return res.status(201).json({
        code: 201,
      });
    } catch (error) {
      return next(error);
    }
  },
};

export default readingHistoryController;
