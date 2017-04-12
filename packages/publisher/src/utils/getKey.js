function getKey (table, event, defaultValue) {
  return Object.keys(table).reduce((total, key) => {
    return table[key].includes(event) ? key : total;
  }, defaultValue);
}

module.exports = getKey;
