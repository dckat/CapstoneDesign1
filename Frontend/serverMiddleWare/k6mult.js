import ws from 'k6/ws';
import { check } from 'k6';

export const options = {
  // vus: 100,
  // duration: '30s',
  stages: [
    { duration: '60s', target: 10 },
    // { duration: '10s', target: 30 },
    // { duration: '20s', target: 50 },
  ],
};

export default function () {
  const url = 'ws://localhost:8080';
  const params = { tags: { my_tag: 'hello' } };
  const res = {};

  for (let i = 0; i < 10; i += 1) {
    res[i] = ws.connect(`${url}/${i + 1}`, params, (socket) => {
      socket.on('open', () => console.log('connected', i));
      socket.on('message', (data) => console.log('Message received: ', i));
      socket.on('close', () => console.log('disconnected'));
      socket.setTimeout(() => {
        console.log('60 seconds passed, closing the socket');
        socket.close();
      }, 60000);
    });
  }
  console.log(res);
  check(res, {
    'status1 is 101': (r) => r && r[0].status === 101,
    'status2 is 101': (r) => r && r[1].status === 101,
    'status3 is 101': (r) => r && r[2].status === 101,
    'status4 is 101': (r) => r && r[3].status === 101,
  });
}
//
// const res1 = ws.connect(`${url}/${1}`, params, (socket) => {
//   socket.on('open', () => console.log('connected'));
//   socket.on('message', (data) => console.log('Message received: 1'));
//   socket.on('close', () => console.log('disconnected'));
//   socket.setTimeout(() => {
//     console.log('60 seconds passed, closing the socket');
//     socket.close();
//   }, 60000);
// });
//
// const res2 = ws.connect(`${url}/${2}`, params, (socket) => {
//   socket.on('open', () => console.log('connected'));
//   socket.on('message', (data) => console.log('Message received: 2'));
//   socket.on('close', () => console.log('disconnected'));
//   socket.setTimeout(() => {
//     console.log('60 seconds passed, closing the socket');
//     socket.close();
//   }, 60000);
// });
//
// const res3 = ws.connect(`${url}/${3}`, params, (socket) => {
//   socket.on('open', () => console.log('connected'));
//   socket.on('message', (data) => console.log('Message received: 3'));
//   socket.on('close', () => console.log('disconnected'));
//   socket.setTimeout(() => {
//     console.log('60 seconds passed, closing the socket');
//     socket.close();
//   }, 60000);
// });
//
// const res4 = ws.connect(`${url}/${4}`, params, (socket) => {
//   socket.on('open', () => console.log('connected'));
//   socket.on('message', (data) => console.log('Message received: 4'));
//   socket.on('close', () => console.log('disconnected'));
//   socket.setTimeout(() => {
//     console.log('60 seconds passed, closing the socket');
//     socket.close();
//   }, 60000);
// });
//
// const res5 = ws.connect(`${url}/${5}`, params, (socket) => {
//   socket.on('open', () => console.log('connected'));
//   socket.on('message', (data) => console.log('Message received: 5'));
//   socket.on('close', () => console.log('disconnected'));
//   socket.setTimeout(() => {
//     console.log('60 seconds passed, closing the socket');
//     socket.close();
//   }, 60000);
// });
//
// const res6 = ws.connect(`${url}/${6}`, params, (socket) => {
//   socket.on('open', () => console.log('connected'));
//   socket.on('message', (data) => console.log('Message received: 6'));
//   socket.on('close', () => console.log('disconnected'));
//   socket.setTimeout(() => {
//     console.log('60 seconds passed, closing the socket');
//     socket.close();
//   }, 60000);
// });
//
// const res7 = ws.connect(`${url}/${7}`, params, (socket) => {
//   socket.on('open', () => console.log('connected'));
//   socket.on('message', (data) => console.log('Message received: 7'));
//   socket.on('close', () => console.log('disconnected'));
//   socket.setTimeout(() => {
//     console.log('60 seconds passed, closing the socket');
//     socket.close();
//   }, 60000);
// });
//
// const res8 = ws.connect(`${url}/${8}`, params, (socket) => {
//   socket.on('open', () => console.log('connected'));
//   socket.on('message', (data) => console.log('Message received: 8'));
//   socket.on('close', () => console.log('disconnected'));
//   socket.setTimeout(() => {
//     console.log('60 seconds passed, closing the socket');
//     socket.close();
//   }, 60000);
// });
//
// const res9 = ws.connect(`${url}/${9}`, params, (socket) => {
//   socket.on('open', () => console.log('connected'));
//   socket.on('message', (data) => console.log('Message received: 9'));
//   socket.on('close', () => console.log('disconnected'));
//   socket.setTimeout(() => {
//     console.log('60 seconds passed, closing the socket');
//     socket.close();
//   }, 60000);
// });
//
// const res10 = ws.connect(`${url}/${10}`, params, (socket) => {
//   socket.on('open', () => console.log('connected'));
//   socket.on('message', (data) => console.log('Message received: 10'));
//   socket.on('close', () => console.log('disconnected'));
//   socket.setTimeout(() => {
//     console.log('60 seconds passed, closing the socket');
//     socket.close();
//   }, 60000);
// });
// check([res1, res2, res3, res10], { 'status is 101': (r) => r && r.status === 101 });
