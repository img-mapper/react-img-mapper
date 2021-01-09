const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/lib/ImageMapper.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'ImageMapper.js',
    publicPath: '/lib',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
};
