import moment from 'moment';
import { CommentSocket } from './comment.service.js';

class SocketConnection {
  constructor(io, socket) {
    socket.on('disconnect', () => {
      console.log(`${moment().format('hh:mm:ss')} ${socket.id} left`);
    });
  }

  getIO() {
    return this.io;
  }
}

const connectSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`\n${moment().format('hh:mm:ss')} ${socket.id} connected`);

    new SocketConnection(io, socket);
    new CommentSocket(io, socket);
  });

  global.io = io;
};

export default connectSocket;
