import createHttpError from 'http-errors';
import transformQueryParams from '../helpers/transformQueryParams.js';
import { readingHistoryService } from '../services/index.js';

const readingHistoryController = {
  getAll: async (req, res, next) => {
    try {
      const { id: userId } = req.userInfo;
      req.query.userId = userId;

      const params = transformQueryParams(req.query);
      const response = await readingHistoryService.getAll(params);

      if (response.length === 0 || response.data?.length === 0) {
        next(createHttpError(404, 'Không tìm thấy lịch sử đọc nào'));
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
      const { id: userId } = req.userInfo;
      const { titleId, chapterId } = req.body;

      const duplicated = await readingHistoryService.getAll({ userId, titleId });

      if (duplicated.length > 0) {
        const response = await readingHistoryService.update(userId, titleId, {
          chapterId,
        });

        if (!response) {
          next(createHttpError(400, 'không thể hoàn thành việc cập nhật lịch sử đọc'));
        }

        return res.status(200).json({
          code: 200,
          data: response,
        });
      }

      const response = await readingHistoryService.add(userId, titleId, chapterId);

      if (!response) {
        next(createHttpError(400, 'Không thể hoàn thành việc tạo lịch sử đọc'));
      }

      return res.status(201).json({
        code: 201,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default readingHistoryController;
