const webpack = require('webpack');
const path = require('path');
const webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const commonConfig = require('./webpack.config.js');

const ENV = 'production';

module.exports = options => {
  console.log(options);
  return webpackMerge(commonConfig({ env: ENV }), {
    mode: ENV,
    entry: {
      main: './src/main/app/index',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
    },
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
    optimization: {
      minimizer: [new TerserWebpackPlugin()],
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: 'main.[chunkhash].css' }),
      new webpack.LoaderOptionsPlugin(),
    ],
  });
};
