module.exports = {
  rabbitmq: {
    url: process.env.RABBITMQ_URL || 'amqp://localhost',
    topic: 'topic_logs'
  },
  analyticsKeyTable: {
    'analytics.btn': ['btn_click', 'btn_hover'],
    'analytics.img': ['img_fullscreen', 'img_clicked', 'img_hover']
  },
  publisher: {
    defaultKey: 'analytics.general',
    msgFields: ['userId', 'event'],
    port: process.env.PORT || 8080
  },
  subscriber: {
    defaultKey: 'analytics.#'
  }
};
