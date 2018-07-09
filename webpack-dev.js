const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const outputPath = path.join(__dirname, '/public');

module.exports = {
  context: path.join(__dirname, '/src'),
  entry: {
    app: path.join(__dirname, '/src/index.jsx'),
  },
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: outputPath,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          compact: true,
          presets: ['env'],
        },
      },
      {
        test: /\.(styl|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|png|jpg|gif)(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
    },
  },
  plugins: [
    new CleanWebpackPlugin(outputPath, { allowExternal: true }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
    },
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
    }),
    new OptimizeCssAssetsPlugin(),
    new HtmlWebpackPlugin(),
  ],
};
