const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const EslintPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const baseConfig = {
  entry: './src/App.tsx',
  mode: 'development',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[id].app.js',
  },
  devServer: {
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(tsx|ts)?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.(png|gif|jpg|jpeg|ico)$/,
        type: 'asset/resource',
        generator: {
          filename: './assets/img/[name][ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.jsx', '.js', '.ts'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new EslintPlugin({ extensions: ['tsx', 'ts'] }),
    new CleanWebpackPlugin(),
  ],
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');
  return merge(baseConfig, envConfig);
};