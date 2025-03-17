'use strict';

const path = require('path');
const fs = require('fs');
const http = require('http');

function createServer() {
  /* Write your code here */
  // Return instance of http.Server class
  const server = http.createServer((req, res) => {
    const url = req.url;

    if (!url.startsWith('/file')) {
      res.setHeader('content-type', 'text/plain');
      res.writeHead(400);

      res.end('Error: Attempt to access files outside public folder');

      return;
    }

    if (url.indexOf('//') !== -1) {
      res.setHeader('content-type', 'text/plain');
      res.writeHead(404);

      res.end('Error: Paths having duplicated slashes.');

      return;
    }

    if (url === '/file') {
      res.setHeader('content-type', 'text/plain');
      res.writeHead(200);

      res.end('Hint message: Routes not starting with /file/');

      return;
    }

    const filePath = path.resolve(__dirname, url.replace('/file', '../public'));

    if (!fs.existsSync(filePath)) {
      res.setHeader('content-type', 'text/plain');
      res.writeHead(404);

      res.end(`Error: File: ${filePath} does not exist.`);

      return;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');

    res.writeHead(200);

    res.end(fileContent);
  });

  return server;
}

module.exports = {
  createServer,
};
