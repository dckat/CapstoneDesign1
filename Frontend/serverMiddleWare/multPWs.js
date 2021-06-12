/* eslint-disable prefer-arrow-callback,consistent-return,no-param-reassign,no-mixed-operators,no-use-before-define */
const http = require('http');
const WebSocket = require('ws');
const url = require('url');

const server = http.createServer();
const wss = {};

const dataNum = process.argv[2];
const wsServerCnt = process.argv[3];
const port = process.argv[4];
const dataPerWsServer = dataNum / wsServerCnt;

console.log(process.argv);

let pingInterval = null;
let sendInterval = null;

const logData = [];
for (let i = 0; i < dataPerWsServer; i += 1) {
  logData.push({
    latitude: getRandomArbitrary(37200000000000, 37300000000000) / 1000000000000,
    longitude: getRandomArbitrary(126900000000000, 127100000000000) / 1000000000000,
    id: i,
  });
}

function getRandomArbitrary(min, max) {
  return parseInt((Math.random() * (max - min) + min), 10);
}
function circleMove(x, y, radius, max, circleStep) {
  return {
    latitude: x + radius * Math.cos(2 * Math.PI * circleStep / max),
    longitude: y + radius * Math.sin(2 * Math.PI * circleStep / max),
  };
}
function makeCoordData(log, circleStep) {
  if (circleStep == null) {
    circleStep = 0;
  }
  if (circleStep === 3600) {
    circleStep = 0;
  } else circleStep += 1;

  // console.log('step', circleStep);

  return Array.from(
    { length: dataPerWsServer },
    (v, i) => ({
      id: i,
      ...circleMove(log[i].latitude, log[i].longitude, 0.05, 3600, circleStep),
      time: new Date(),
    }),
  );
}
function heartbeat() {
  this.isAlive = true;
  console.log('client Heartbeat');
}
function noop() {}

for (let i = 0; i < wsServerCnt; i += 1) {
  wss[i + 1] = new WebSocket.Server({ noServer: true });
}

Object.entries(wss).forEach(([key, wss]) => {
  wss.on('connection', (ws) => {
    console.log('connected', key);
    ws.isAlive = true;
    ws.on('pong', heartbeat);
    ws.on('message', function incoming(message) {
      console.log('received: %s', message);
    });
    let circleStep = 0;
    sendInterval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        const coordData = makeCoordData(logData, circleStep);
        ws.send(JSON.stringify(coordData));
      }
      circleStep += 1;
    }, 1000);

    ws.on('close', function close() {
      console.log('websocket Closed');
      clearInterval(pingInterval);
      clearInterval(sendInterval);
      // sendInterval = null;
    });

    /* ping check */
    pingInterval = setInterval(function ping() {
      wss.clients.forEach(function each(ws) {
        if (ws.isAlive === false) return ws.terminate();
        ws.isAlive = false;
        ws.ping(noop);
      });
    }, 30000);

    wss.on('close', function close() {
      console.log('server closed');
      clearInterval(pingInterval);
      clearInterval(sendInterval);
    });
  });
});

server.on('upgrade', (request, socket, head) => {
  const { pathname } = url.parse(request.url);

  Object.entries(wss).forEach(([key, wss]) => {
    if (`/${key}` === pathname) {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    }
  });
});

server.listen(port);
