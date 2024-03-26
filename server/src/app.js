import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { socketConfig } from './config/socket.config.js';
import connectMongoose from './helpers/connectMongoose.js';
import errorHandler from './middlewares/errorHandler.middleware.js';
import { middlewares } from './middlewares/index.js';
import routes from './routes/index.js';
import connectSocket from './services/socket.service.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, socketConfig);

connectMongoose();

app.use(middlewares);

app.use('/api', routes);

connectSocket(io);

app.use(errorHandler);

export { app, server };
