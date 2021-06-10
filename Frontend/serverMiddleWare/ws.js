/* eslint-disable prefer-arrow-callback,consistent-return,no-param-reassign,no-mixed-operators,no-use-before-define */
let pingInterval = null;
let sendInterval = null;
const logData = [];
const dataNum = 20000;
for (let i = 0; i < dataNum; i += 1) {
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

  console.log('step', circleStep);

  return Array.from(
    { length: dataNum },
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

const WebSocket = require('ws');

const wss = new WebSocket.Server({
  port: 20202,
  perMessageDeflate: {
    zlibDeflateOptions: {
      // See zlib defaults.
      chunkSize: 1024,
      memLevel: 7,
      level: 3,
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024,
    },
    // Other options settable:
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    serverMaxWindowBits: 10, // Defaults to negotiated value.
    // Below options specified as default values.
    concurrencyLimit: 10, // Limits zlib concurrency for perf.
    threshold: 1024, // Size (in bytes) below which messages
    // should not be compressed.
  },
});

wss.on('connection', function connection(ws) {
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
