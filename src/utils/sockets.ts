// import io, { Socket } from 'socket.io-client';
import WebSocket from 'ws';

const ws: WebSocket = new WebSocket('wss://api.fikas.io/');

ws.on('error', console.error);

ws.on('open', function open() {
  console.info('connected');
  ws.send(Date.now());
});

ws.on('close', function close() {
  console.info('disconnected');
});

ws.on('message', function message(data) {
  console.info(`Round-trip time: ${Date.now()} ms: ${data}`);

  setTimeout(function timeout() {
    ws.send(Date.now());
  }, 500);
});

export function initializeSocket() {
}

export function getSocket(): WebSocket {
  return ws;
}

/*
let socket: Socket | null = null;

export function initializeSocket() {
  socket = io('wss://api.fikas.io', {
    transports: ['websocket', 'polling'],
  });
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
*/
