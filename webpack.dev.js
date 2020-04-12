const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackInjector = require('html-webpack-injector');
const HandlebarsPlugin = require('handlebars-webpack-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new HtmlWebpackInjector(),
    new HandlebarsPlugin({
      entry: path.join(process.cwd(), 'src', '*.hbs'),
      output: path.join(process.cwd(), 'src', '[name].html'),
      data: path.join(process.cwd(), 'src/data/lang.es.json'),
      partials: [path.join(process.cwd(), 'src', 'partials', '*.hbs')],
      helpers: {
        projectHelpers: path.join(
          process.cwd(),
          'src',
          'helpers',
          '*.helper.js'
        )
      }
    }),
    new HandlebarsPlugin({
      entry: path.join(process.cwd(), 'src', 'html','*.hbs'),
      output: path.join(process.cwd(), 'src','html','[name].html'),
      data: path.join(process.cwd(), 'src/data/lang.es.json')
    }),
  ],
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
          // Adds prefix for cross-browser support
          {
            loader: 'resolve-url-loader',
            options: { sourceMap: true }
          }, // Webpack loader that resolves relative paths in url() statements based on the original source file.
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                includePaths: [path.resolve(__dirname, 'node_modules')]
              }
            }
          } // Loads a Sass/SCSS file and compiles it to CSS.
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
