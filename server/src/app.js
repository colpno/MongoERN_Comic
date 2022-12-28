/* eslint-disable no-unused-vars */
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import moment from 'moment';

import { socketConfig } from './config/socket.config.js';
import { middlewares } from './middlewares/index.js';
import routes from './routes/index.js';
import connectMongoose from './helpers/connectMongoose.js';
import errorHandler from './middlewares/errorHandler.middleware.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, socketConfig);

// Mongoose
connectMongoose();

app.use(middlewares);

app.use(routes);

// app.use((req, res, next) => {
// res.io = io;
//   next();
// });

// io.on('connection', (socket) => {
//   console.log(`\n${moment().format('hh:mm:ss')} ${socket.id} connected`);

//   socket.on('disconnect', () => {
//     console.log(`${moment().format('hh:mm:ss')} ${socket.id} left`);
//   });
// });

app.use(errorHandler);

export { server };
