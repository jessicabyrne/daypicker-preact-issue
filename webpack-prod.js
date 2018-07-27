const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const outputPath = path.join(__dirname, '/public');

module.exports = {
  context: path.join(__dirname, '/src'),
  entry: {
    app: path.join(__dirname, '/src/index.jsx'),
  },
  mode: 'production',
  output: {
    filename: '[hash].[name].js',
    chunkFilename: '[hash].[name].js',
    path: outputPath,
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        // Create a separate chunk for preact to apply slightly different
        // Uglify options on it.
        preact: {
          name: 'preact',
          chunks: 'all',
          minSize: 0,
          test: /[\\/]preact[\\/]/,
          priority: 99,
        },
      },
    },
    minimizer: [
      // Prevent function reduction in preact for preact-compat to work.
      new UglifyJsPlugin({
        include: /preact\.js$/,
        uglifyOptions: {
          compress: {
            reduce_funcs: false,
          },
        },
      }),
      // Normal uglifying for everything else.
      new UglifyJsPlugin({
        exclude: /preact\.js$/,
        cache: true,
        parallel: true,
      }),
    ],
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
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[hash].[name].css',
    }),
    new OptimizeCssAssetsPlugin(),
    new HtmlWebpackPlugin(),
  ],
};
