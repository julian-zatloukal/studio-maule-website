const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AppManifestWebpackPlugin = require('app-manifest-webpack-plugin');
const HtmlWebpackInjector = require('html-webpack-injector');
const HandlebarsPlugin = require('handlebars-webpack-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'js/[name].[contentHash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()],
    runtimeChunk: 'single'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: 'css/[name].[contentHash].css' }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      //filename: path.join(__dirname, 'dist', 'partials', 'index.hbs'),
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
    new AppManifestWebpackPlugin({
      logo: './src/assets/ico/logomark.svg',
      statsFilename: 'iconstats.json',
      persistentCache: false,
      inject: true,
      output: './ico/',
      prefix: './ico/',
      config: {
        icons: {
          android: false, // Create Android homescreen icon. `boolean` or `{ offset, background, shadow }`
          appleIcon: false, // Create Apple touch icons. `boolean` or `{ offset, background }`
          appleStartup: true, // Create Apple startup images. `boolean` or `{ offset, background }`
          coast: { offset: 25 }, // Create Opera Coast icon with offset 25%. `boolean` or `{ offset, background }`
          favicons: true, // Create regular favicons. `boolean`
          firefox: true, // Create Firefox OS icons. `boolean` or `{ offset, background }`
          windows: true, // Create Windows 8 tile icons. `boolean` or `{ background }`
          yandex: true // Create Yandex browser icon. `boolean` or `{ background }`
        }
      }
    }),
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
    new RemovePlugin({
      after: {
        test: [
          {
            folder: path.join(process.cwd(), 'src'),
            method: absoluteItemPath => {
              return new RegExp(/\.html$/, 'm').test(absoluteItemPath);
            }
          }
        ]
      }
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
                return path.dirname('../../', context) + '/';
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
