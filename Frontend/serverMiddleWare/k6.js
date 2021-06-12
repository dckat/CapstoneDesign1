import ws from 'k6/ws';
import { check } from 'k6';

export const options = {
  // vus: 100,
  // duration: '30s',
  stages: [
    { duration: '60s', target: 10 },
  ],
};

export default function () {
  const url = 'ws://localhost:8080';
  const params = { tags: { my_tag: 'hello' } };

  const res = ws.connect(url, params, (socket) => {
    socket.on('open', () => console.log('connected'));
    socket.on('message', (data) => console.log('Message received: '));
    socket.on('close', () => console.log('disconnected'));
    socket.setTimeout(() => {
      console.log('60 seconds passed, closing the socket');
      socket.close();
    }, 30000);
  });

  check(res, { 'status is 101': (r) => r && r.status === 101 });
}
