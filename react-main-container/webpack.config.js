const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const deps = require('./package.json').dependencies;
module.exports = {
  output: {
    publicPath: 'http://localhost:4000/',
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },

  devServer: {
    port: 4000,
    historyApiFallback: true,
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
      name: 'reactMainContainer',
      filename: 'reactMainContainer.js',
      remotes: {
        reactMfe: 'reactMfe@http://localhost:5000/reactMicrofrontendEntry.js',
      },
      exposes: {},
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
  ],
};
