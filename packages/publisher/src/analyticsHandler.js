const { analyticsKeyTable, publisher } = require(process.env.CONFIG ? '../' + process.env.CONFIG : '../../config');
const Publisher = require('./publisher');
const getKey = require('./utils/getKey');

function analyticsHandler (msg, callback) {
  Publisher.getInstance((err, pub) => {
    if (err) {
      return callback(err);
    }

    const eventKey = getKey(analyticsKeyTable, msg.event, publisher.defaultKey);
    pub.publishMsg(eventKey, JSON.stringify(msg), (err, result) => {
      if (err) {
        return callback(err);
      }

      return callback(null, 'Published!');
    });
  });
}

module.exports = analyticsHandler;
