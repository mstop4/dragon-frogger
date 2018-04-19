'use strict'

const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    app: ['babel-polyfill', path.resolve(__dirname, 'src', 'index.js')],
    vendor: ['phaser']
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[chunkhash].js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader'
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: 'raw-loader'
      }
    ]
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: true,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ]
  },

  plugins: [
    new CleanWebpackPlugin('build'),

    new webpack.DefinePlugin({
      'CANVAS_RENDERER': JSON.stringify(true),
      'WEBGL_RENDERER': JSON.stringify(true)
    }),

    new HtmlWebpackPlugin({
      path: path.resolve(__dirname, 'build', 'index.html'),
      template: 'index.html'
    }),

    // https://webpack.js.org/plugins/hashed-module-ids-plugin
    new webpack.HashedModuleIdsPlugin(),

    // https://webpack.js.org/plugins/split-chunks-plugin/
    new webpack.optimize.SplitChunksPlugin(),

    // ßhttps://webpack.js.org/plugins/copy-webpack-plugin/
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname,'assets'), 
        to: path.resolve(__dirname, 'build', 'assets')
      }
    ])
  ]
}