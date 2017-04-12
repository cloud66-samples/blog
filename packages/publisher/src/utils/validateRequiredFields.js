const config = require(process.env.CONFIG ? '../../' + process.env.CONFIG : '../../../config');

function validateRequiredFields (jsonMsg, callback) {
  const jsonKeys = Object.keys(jsonMsg);
  if (jsonKeys.length !== config.publisher.msgFields.length) {
    return callback(new Error('Invalid fields.'));
  }

  const includesKeys = jsonKeys.every((key) => {
    return config.publisher.msgFields.includes(key);
  });

  let err;
  if (!includesKeys) {
    err = new Error('Invalid fields.');
  }

  return callback(err, jsonMsg);
}

module.exports = validateRequiredFields;
