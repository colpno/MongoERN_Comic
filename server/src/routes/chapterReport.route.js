import express from 'express';
import chapterReportController from '../controllers/chapterReport.controller.js';
import { isAuthenticated } from '../middlewares/authenticate.middleware.js';

const route = express.Router();

route.get('/', isAuthenticated, chapterReportController.getAll);

export default route;
