const BodyParser = require('body-parser');
const jsonParser = BodyParser.json();

function bodyParser (request, response, callback) {
  jsonParser(request, response, (err) => {
    return callback(err, request.body);
  });
}

module.exports = bodyParser;
