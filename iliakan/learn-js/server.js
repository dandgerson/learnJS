const http = require('http');
const static = require('node-static');
const file = new static.Server('.');

http.createServer(accept).listen(8080);
console.log('Server running on port 8080');

function accept(req, res) {
  return file.serve(req, res);
}