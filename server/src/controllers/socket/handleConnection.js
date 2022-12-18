import moment from 'moment';

export default function handleConnection(socket) {
  console.log(`\n${moment().format('hh:mm:ss')} ${socket.id} connected`);

  socket.on('disconnect', () => {
    console.log(`${moment().format('hh:mm:ss')} ${socket.id} left`);
  });
}
