const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const workboxPlugin = require('workbox-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = options => {
  console.log(options);
  return {
    plugins: [
      new webpack.ProgressPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          SERVER_API_URL: 'https://haetamisworld.com',
        },
      }),
      new workboxPlugin.GenerateSW({
        swDest: 'sw.js',
        clientsClaim: true,
        skipWaiting: false,
      }),
      new ForkTsCheckerWebpackPlugin({ eslint: true }),
      new HtmlWebpackPlugin({
        template: './src/main/index.html',
        chunksSortMode: 'auto',
        inject: 'body',
      }),
    ],

    module: {
      rules: [
        {
          test: /.(ts|tsx)?$/,
          loader: 'ts-loader',
          include: [path.resolve(__dirname, 'src/main/app')],
          exclude: [/node_modules/],
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
          options: {
            minimize: true,
            caseSensitive: true,
          },
          exclude: /(src\/main\/index.html)/,
        },
        {
          test: /\.(j|t)sx?$/,
          enforce: 'pre',
          loader: 'eslint-loader',
          exclude: /node_modules/,
        },
      ],
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },

    optimization: {
      minimizer: [new TerserPlugin()],

      splitChunks: {
        cacheGroups: {
          vendors: {
            priority: -10,
            test: /[\\/]node_modules[\\/]/,
          },
        },

        chunks: 'async',
        minChunks: 1,
        minSize: 30000,
        name: true,
      },
    },
  };
};
