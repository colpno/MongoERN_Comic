import express from 'express';
import titleReportController from '../controllers/titleReport.controller.js';
import { isAuthenticated } from '../middlewares/authenticate.middleware.js';

const route = express.Router();

route.get('/', isAuthenticated, titleReportController.getAll);

export default route;
