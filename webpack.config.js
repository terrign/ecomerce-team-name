const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const EslintPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const baseConfig = (env) => {
  return {
    entry: './src/index.tsx',
    mode: 'development',
    output: {
      path: path.join(__dirname, '/dist'),
      filename: '[id].app.js',
      publicPath: '/',
    },
    devServer: {
      port: 8080,
      historyApiFallback: true,
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
          test: /\.(png|gif|jpg|jpeg|ico|svg)$/,
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
        favicon: path.resolve(__dirname, './src/assets/favicon.ico'),
      }),
      new EslintPlugin({ extensions: ['tsx', 'ts'] }),
      new CleanWebpackPlugin(),
      new Dotenv({
        path: env ? `./.env.${env}` : './.env',
      }),
      new CopyPlugin({
        patterns: [path.resolve(__dirname, '_redirects')],
      }),
    ],
  };
};

module.exports = (webpackConfig, { mode }) => {
  const isProductionMode = mode === 'production';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');
  return merge(baseConfig(mode), envConfig);
};
