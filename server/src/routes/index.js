import dotenv from 'dotenv';
import { Router } from 'express';

import approvedStatusRoute from './approvedStatus.route.js';
import authRoute from './auth.route.js';
import chapterRoute from './chapter.route.js';
import chapterReportRoute from './chapterReport.route.js';
import chapterTransactionRoute from './chapterTransaction.route.js';
import transactionRoute from './transaction.route.js';
import commentRoute from './comment.route.js';
import favoriteRoute from './favorite.route.js';
import followRoute from './follow.route.js';
import genreRoute from './genre.route.js';
import incomeRoute from './income.route.js';
import notificationRoute from './notification.route.js';
import objectStatusRoute from './objectStatus.route.js';
import paymentMethodRoute from './paymentMethod.route.js';
import paypalRoute from './paypal.route.js';
import personalNotificationRoute from './personalNotification.route.js';
import readingHistoryRoute from './readingHistory.route.js';
import titleRoute from './title.route.js';
import titleReportRoute from './titleReport.route.js';
import userRoute from './user.route.js';
import vnpayRoute from './vnpay.route.js';

dotenv.config();

const routes = Router();

routes.use('/approved-statuses', approvedStatusRoute);
routes.use('/auth', authRoute);
routes.use('/chapters', chapterRoute);
routes.use('/chapter-reports', chapterReportRoute);
routes.use('/chapter-transactions', chapterTransactionRoute);
routes.use('/transactions', transactionRoute);
routes.use('/comments', commentRoute);
routes.use('/favorites', favoriteRoute);
routes.use('/follows', followRoute);
routes.use('/genres', genreRoute);
routes.use('/income-reports', incomeRoute);
routes.use('/object-statuses', objectStatusRoute);
routes.use('/payment-methods', paymentMethodRoute);
routes.use('/personal-notifications', personalNotificationRoute);
routes.use('/reading-histories', readingHistoryRoute);
routes.use('/titles', titleRoute);
routes.use('/title-reports', titleReportRoute);
routes.use('/vnpay', vnpayRoute);
routes.use('/paypal', paypalRoute);
routes.use('/users', userRoute);
routes.use('/notifications', notificationRoute);

export default routes;
