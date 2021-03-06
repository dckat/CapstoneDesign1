import ws from 'k6/ws';
import { check } from 'k6';

export default function () {
  const url = 'ws://echo.websocket.org';
  const params = { tags: { my_tag: 'hello' } };

  const res = ws.connect(url, params, (socket) => {
    socket.on('open', () => {
      console.log('connected');

      socket.setInterval(() => {
        socket.ping();
        console.log('Pinging every 1sec (setInterval test)');
      }, 1000);
    });

    socket.on('ping', () => {
      console.log('PING!');
    });

    socket.on('pong', () => {
      console.log('PONG!');
    });

    socket.on('close', () => {
      console.log('disconnected');
    });

    socket.setTimeout(() => {
      console.log('2 seconds passed, closing the socket');
      socket.close();
    }, 2000);
  });

  check(res, {
    'status is 101': (r) => r && r.status === 101,
    'Homepage body size is 11026 bytes': (r) => r.body && r.body.length === 11026,
    test: (r) => r,
  });
}
