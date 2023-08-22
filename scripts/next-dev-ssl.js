// const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const proxy = require('http-proxy');

const cert = path.join(process.cwd(), 'localhost.pem');
const key = path.join(process.cwd(), 'localhost-key.pem');

proxy
  .createServer({
    xfwd: true,
    ws: true,
    target: {
      host: 'localhost',
      port: 5002,
    },
    ssl: {
      key: fs.readFileSync(key, 'utf8'),
      cert: fs.readFileSync(cert, 'utf8'),
    },
  })
  .on('error', (e) => {
    console.error(`Request failed to proxy: ${e.code}`);
  })
  .listen(3001);
