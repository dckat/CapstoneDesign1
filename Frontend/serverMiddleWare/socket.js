/* eslint-disable prefer-arrow-callback */
// <project root>/api/index.js
// const express = require('express');

function getRandomArbitrary(min, max) {
  return parseInt((Math.random() * (max - min) + min), 10);
}
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: true,
  origins: ['http://127.0.0.1:3000', 'http://127.0.0.1:8888', 'http://localhost:3000'],
});
const cors = require('cors');

app.use(cors());

// 실제로는 /api 라우트를 처리하는 메소드가 된다.
app.get('/', (req, res) => {
  console.log('hi');
  io.of('/testSoc').emit('connection', { data: '1234' });
  res.send('API root');
});

io.of('/testSoc').on('connect', (socket) => {
  console.log('클라이언트 접속');

  socket.on('getMessage', (data) => {
    console.log('fromClient', data);
  });
  socket.on('disconnect', () => {
    console.log('클라이언트 접속 종료');
  });
  setInterval(() => {
    socket.emit('receiveLog', { num: getRandomArbitrary(10, 100), time: new Date() });
  }, 1000);
});

http.listen(8888, () => {
  console.log('Socket IO server listening on port 8888');
});
