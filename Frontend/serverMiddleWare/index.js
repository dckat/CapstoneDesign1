// <project root>/api/index.js
// const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// 실제로는 /api 라우트를 처리하는 메소드가 된다.
app.get('/', (req, res) => {
  console.log('hi');
  io.emit('connection');
  res.send('API root');
});

io.of('/analytics').on('connect', (socket) => {
  console.log('클라이언트 접속');

  socket.on('disconnect', () => {
    console.log('클라이언트 접속 종료');
  });
  setInterval(() => {
    socket.emit('message', '메세지');
  }, 3000);
});

// 모듈로 사용할 수 있도록 export
// 앱의 /api/* 라우트로 접근하는 모든 요청은 모두 app 인스턴스에게 전달된다.
module.exports = {
  path: '/socket',
  handler: app,
};
