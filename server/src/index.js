import { config } from 'dotenv';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

import { handleConnection } from './controllers/socket/index.js';
import { handleMiddleWares } from './middlewares/index.js';
import { routeDivider } from './routes/index.js';

config();

const { PORT, SERVER_URL, CLIENT_URL, ADMIN_URL } = process.env;
const SOCKET_SERVER_CONFIG = { cors: { origin: [CLIENT_URL, ADMIN_URL] } };

const app = express();
const server = http.createServer(app);
const socketIO = new Server(server, SOCKET_SERVER_CONFIG);

// Middle wares
handleMiddleWares(app);

// Routes
routeDivider(app);

// Socket
socketIO.on('connection', handleConnection);

// Server
server.listen(PORT, () => {
  console.log(`Server is running on ${SERVER_URL}`);
});
