// simple HTTP server with a simple route
const http = require('http');
const waterfall = require('async/waterfall');
const apply = require('async/apply');

const config = require(process.env.CONFIG || '../config');
const analyticsHandler = require('./src/analyticsHandler');
const { bodyParser, validateRequiredFields } = require('./src/utils');

const server = http.createServer((request, response) => {
  console.log(`${request.method}: ${request.url}`);

  if (!(request.method === 'POST' && request.url === '/analytics')) {
    response.statusCode = 404;
    return response.end('Invalid route');
  }

  waterfall([
    apply(bodyParser, request, response),
    validateRequiredFields,
    analyticsHandler
  ], (err, result) => {
    if (err) {
      response.statusCode = 400; // or 500
      return response.end(err.toString());
    }
    return response.end(result);
  });
});

server.listen(config.publisher.port, () => {
  console.log(`Server started - http://localhost:${config.publisher.port}`);
});
