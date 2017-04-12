const amqp = require('amqplib/callback_api');
const config = require(process.env.CONFIG ? '../' + process.env.CONFIG : '../../config');

module.exports = (() => {
  let instance;
  let conn;
  let ch;

  function initConnection (callback) {
    amqp.connect(config.rabbitmq.url, (err, connection) => {
      if (err) {
        return callback(err);
      }
      conn = connection;
      conn.createChannel((err, channel) => {
        if (err) {
          return callback(err);
        }
        ch = channel;
        return callback();
      });
    });
  }

  function publishMsg (key, msg, callback) {
    if (!instance || !conn || !ch) {
      return callback(new Error('No instance, connection or channel was found.'));
    }

    ch.assertExchange(config.rabbitmq.topic, 'topic', { durable: false });
    ch.publish(config.rabbitmq.topic, key, new Buffer(msg));

    console.log('Key:', key);
    console.log('Msg:', msg);
    callback(null, 'Message sent!');
  }

  function closeConnection (callback) {
    conn.close();
    callback();
  }

  function init (callback) {
    initConnection((err, result) => {
      if (err) {
        console.log('Error to initiate connection with rabbitmq server...', err);
        return callback(err);
      }
      console.log('Connection with rabbitmq started...');

      // returns public functions
      return callback(err, {
        publishMsg,
        closeConnection
      });
    });
  }

  return {
    getInstance: (callback) => {
      if (!instance) {
        return init((err, result) => {
          if (err) {
            return callback(err);
          }
          instance = result;
          return callback(null, result);
        });
      }

      return callback(null, instance);
    }
  };
})();
