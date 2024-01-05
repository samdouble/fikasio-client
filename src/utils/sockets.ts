import io, { Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function initializeSocket() {
  socket = io('wss://api.fikas.io', { transports: ['websocket', 'polling'] });
  socket.connect();
  socket.on('connect', () => {
    // console.log('CONNECTED');
  });
  socket.on('disconnect', () => {
    // console.log('DISCONNECTED');
  });
  socket.on('error', err => {
    console.error('ERROR', err);
  });
}

export function getSocket(): Socket | null {
  return socket;
}
