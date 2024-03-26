import { config } from 'dotenv';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { socketConfig } from '../src/config/socket.config.js';
import connectMongoose from '../src/helpers/connectMongoose.js';
import errorHandler from '../src/middlewares/errorHandler.middleware.js';
import { middlewares } from '../src/middlewares/index.js';
import routes from '../src/routes/index.js';
import connectSocket from '../src/services/socket.service.js';

config();

const { PORT, SERVER_URL, BASE_URL } = process.env;

const app = express();
const server = http.createServer(app);
const io = new Server(server, socketConfig);

connectMongoose();

app.use(middlewares);

app.use('api', routes);

connectSocket(io);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on ${SERVER_URL}${BASE_URL}`);
});

export default app;
