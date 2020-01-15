const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const BrowserSyncWebpackPlugin = require('browser-sync-webpack-plugin');
const WebpackNotifier = require('webpack-notifier');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const commonConfig = require('./webpack.config.js');

const ENV = 'development';

module.exports = options => {
  console.log(options);
  return webpackMerge(commonConfig({ env: ENV }), {
    mode: ENV,
    entry: ['./src/main/app/index'],
    output: {
      path: path.resolve(__dirname, '..', 'dist'),
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: 'main.[chunkhash].css' }),
      new SimpleProgressWebpackPlugin({
        format: 'compact',
      }),
      new BrowserSyncWebpackPlugin(
        {
          host: 'localhost',
          port: 9000,
        },
        {
          reload: false,
        },
      ),
      new webpack.HotModuleReplacementPlugin(),
      new WebpackNotifier({
        title: 'React JS Basic Setup',
      }),
    ],
    module: {
      rules: [
        {
          test: /.css$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
    devServer: {
      hot: true,
      contentBase: './dist',
      watchOptions: {
        ignored: /node_modules/,
      },
    },
  });
};
