const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReplaceCSSUrl = require('webpack-plugin-replace-css-url');
const AppManifestWebpackPlugin = require('app-manifest-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'js/[name].[contentHash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './'
  },
  node: {
    fs: 'empty'
  },
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()],
    runtimeChunk: 'single'
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
    new MiniCssExtractPlugin({ filename: 'css/[name].[contentHash].css' }),
    new HtmlWebpackPlugin({
      template: './src/template.html',
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
    new AppManifestWebpackPlugin({
      logo: './src/assets/ico/logomark.svg',
      statsFilename: 'iconstats.json',
      persistentCache: false,
      inject: true,
      output: './ico/',
      prefix: './ico/'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return (
                  path.relative(path.dirname(resourcePath), context) + '/dist/'
                );
              }
            }
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
