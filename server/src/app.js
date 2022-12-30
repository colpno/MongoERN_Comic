/* eslint-disable no-param-reassign */
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

connectMongoose();

app.use(middlewares);

app.use(routes);

let users = [];
io.on('connection', (socket) => {
  console.log(`\n${moment().format('hh:mm:ss')} ${socket.id} connected`);

  const newUser = { userId: socket.id, room: '' };
  users.push(newUser);

  socket.on('join-title', (titleId) => {
    users.forEach((user) => {
      if (user.userId === socket.id) {
        user.room = titleId;
      }
    });
    socket.join(titleId);
  });

  socket.on('disconnect', () => {
    console.log(`${moment().format('hh:mm:ss')} ${socket.id} left`);
    const newUsers = users.filter((user) => user.userId !== socket.id);
    users = newUsers;
  });
});

global.io = io;

app.use(errorHandler);

export { server };
