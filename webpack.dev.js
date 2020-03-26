const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      {
        context: './',
        from: 'node_modules/hyphenopoly/Hyphenopoly.js',
        to: './js/hyphenopoly/',
        force: true,
        flatten: true
      },
      {
        context: './',
        from: 'node_modules/hyphenopoly/Hyphenopoly_Loader.js',
        to: './js/hyphenopoly/',
        force: true,
        flatten: true
      },
      {
        context: './',
        from: 'node_modules/hyphenopoly/patterns/*',
        to: './js/hyphenopoly/patterns/',
        force: true,
        flatten: true
      }
    ]),
    new HtmlWebpackPlugin({
      template: './src/template.html'
    })
  ],
  node: {
    fs: 'empty'
  },
  optimization: {
    runtimeChunk: 'single'
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
            options: {
              sassOptions: {
                includePaths: [path.resolve(__dirname, 'node_modules')]
              }
            }
          }
        ],
        include: [/fonts/, path.resolve(__dirname, 'src', 'scss')]
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        loader: 'file-loader',
        include: [/fonts/],
        options: {
          name: '[name].[hash].[ext]',
          outputPath: 'fonts/',
          esModule: false
        }
      }
    ]
  }
});
