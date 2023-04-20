/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const deps = require('./package.json').dependencies;

module.exports = () => {
  const MFE_PUBLIC_PATH = 'http://localhost:5000/';

  return {
    output: {
      publicPath: MFE_PUBLIC_PATH,
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    },

    devServer: {
      port: 5000,
      historyApiFallback: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      },
    },

    module: {
      rules: [
        {
          test: /\.m?js/,
          type: 'javascript/auto',
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.json$/,
          type: 'json',
        },
      ],
    },

    plugins: [
      new ModuleFederationPlugin({
        name: 'reactMfe',
        filename: 'reactMicrofrontendEntry.js',
        remotes: {},
        exposes: {
          './microfrontend': './src/Microfrontend.tsx',
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: deps['react-dom'],
          },
          'react-i18next': {
            singleton: true,
            requiredVersion: deps['react-i18next'],
          },
          i18next: {
            singleton: true,
            requiredVersion: deps.i18next,
          },
          'i18next-browser-languagedetector': {
            singleton: true,
            requiredVersion: deps['i18next-browser-languagedetector'],
          },
          'i18next-http-backend': {
            singleton: true,
            requiredVersion: deps['i18next-http-backend'],
          },
        },
      }),
      new HtmlWebPackPlugin({
        template: './src/index.html',
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
          // exposing this to be consumed within the i18next config - for i18next-http-backend & MFE integration we need to set an absolute URL
          // in more complicated setups (i.e. dev vs. staging vs. prod...) you may want to add logic to MFE_PUBLIC_PATH to differentiate URLs
          BASE_URL: JSON.stringify(MFE_PUBLIC_PATH),
        },
      }),
    ],
  };
};
