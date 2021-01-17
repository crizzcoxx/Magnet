
require("dotenv").config();

const path = require("path");
const Dotenv = require("dotenv-webpack");
const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');
//const withCSS = require('@zeit/next-css')

const nextConfig = {
  target: 'serverless',
  webpack(config) {
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true
      })
    ],
      config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 8192,
          publicPath: '/_next/public/',
          outputPath: 'public/',
          name: '[name].[ext]',
        },
      }
    });
    return config;
  },
};

module.exports = withPlugins([[withImages]], nextConfig);
