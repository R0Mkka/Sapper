var path = require('path');

module.exports = {
  entry: './js/start.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
