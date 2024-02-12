import { config } from 'dotenv';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { socketConfig } from './config/socket.config.js';
import { cronJob } from './cron.js';
import connectMongoose from './helpers/connectMongoose.js';
import errorHandler from './middlewares/errorHandler.middleware.js';
import { middlewares } from './middlewares/index.js';
import routes from './routes/index.js';
import connectSocket from './services/socket.service.js';

config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, socketConfig);

if (process.env.NODE_ENV === 'production') {
  cronJob.start();
  console.log('CronJob  started');
}

connectMongoose();

app.use(middlewares);

app.use(routes);

connectSocket(io);

app.use(errorHandler);

export { server };
