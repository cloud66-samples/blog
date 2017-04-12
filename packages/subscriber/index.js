const amqp = require('amqplib/callback_api');
const config = require(process.env.CONFIG || '../config');

amqp.connect(config.rabbitmq.url, (err, conn) => {
  if (err) {
    return console.log(err); // TODO retry after X millisecs
  }

  conn.createChannel((err, ch) => {
    if (err) {
      return console.log(err); // TODO retry after X millisecs
    }

    const args = process.argv.splice(2);
    const keys = args.length > 0 ? args : [ config.subscriber.defaultKey ];

    ch.assertExchange(config.rabbitmq.topic, 'topic', { durable: false });

    ch.assertQueue('', { exclusive: true }, (err, q) => {
      if (err) {
        return console.log(err); // TODO retry after X millisecs
      }

      console.log(`Waiting for messages in ${q.queue}. To exit press CTRL+C`);

      keys.forEach((key) => {
        ch.bindQueue(q.queue, config.rabbitmq.topic, key);
        console.log('Key:', key);
      });

      ch.consume(q.queue, (msg) => {
        console.log('Msg received:', msg.content.toString());
      }, { noAck: true });
    });
  });
});
