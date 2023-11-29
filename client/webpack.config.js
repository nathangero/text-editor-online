const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack Plugin',
        favicon: './favicon.ico',
      }),
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "service-worker.js"
      }),
      new WebpackPwaManifest({
        filename: "manifest.json",
        name: "Just Another Text Editor",
        short_name: "JATE",
        start_url: "./",
        publicPath: "./",
        crossorigin: 'use-credentials',
        theme_color: '#272822',
        background_color: '#272822',
        display: 'standalone',
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            destination: path.join('assets', 'icons'),
            type: "image/png",
            sizes: [96, 128, 192, 256, 384, 512],
            purpose: "any maskable"
          }
        ]
      })
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource'
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
