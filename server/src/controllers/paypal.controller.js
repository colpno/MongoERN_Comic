import 'dotenv/config';
import { paypalService, userService } from '../services/index.js';

const paypalController = {
  order: async (req, res, next) => {
    try {
      const { data } = req.body;

      const response = await paypalService.order(data);

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  },
  capture: async (req, res, next) => {
    try {
      const { orderID } = req.body;

      const response = await paypalService.capture(orderID);

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },
  payout: async (req, res, next) => {
    try {
      const { amount, receiverEmail } = req.body;
      const { id: userId } = req.userInfo;

      const response = await paypalService.payout(amount, receiverEmail);
      const { batch_status = 'DENIED' } = response.data.batch_header;

      let returnedMessage = '';
      if (batch_status === 'SUCCESS') {
        returnedMessage =
          'Bạn đã rút tiền thành công. Cảm ơn bạn vì đã sử dụng dịch vụ của chúng tôi!';
      }

      if (batch_status === 'PENDING') {
        returnedMessage =
          'Bạn đã rút tiền thành công. Nhưng có thể vì tài khoản chưa được kích hoạt nên giao dịch đang ở trạng thái chờ.';
      }

      if (returnedMessage) {
        await userService.update(userId, { $inc: { income: -Number.parseInt(amount, 10) } });

        return res.status(200).json({
          code: 200,
          message: returnedMessage,
        });
      }

      console.log(response);
      throw new Error('Có vấn đề trong giao dịch. Xin vui lòng liên hệ help@mail.domain');
    } catch (error) {
      next(error);
    }
  },
};

export default paypalController;
