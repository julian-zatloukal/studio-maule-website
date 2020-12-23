const path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    vendor_head: './src/vendor_head.js',
    vendor_body: './src/vendor_body.js',
    main: './src/index.js'
  },
  resolve: {
    alias: {
      jquery: 'jquery/src/jquery'
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new MomentLocalesPlugin(),
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
        from: 'node_modules/hyphenopoly/patterns/{es,it}.wasm',
        to: './js/hyphenopoly/patterns/',
        globOptions: {
          extglob: true
        },
        force: true,
        flatten: true
      }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          interpolate: true
        }
      },
      {
        test: /\.(png|ico|svg|jpg|gif|jpeg)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: (url, resourcePath, context) => {
              // `resourcePath` is original absolute path to asset
              // `context` is directory where stored asset (`rootContext`) or `context` option

              // To get relative path you can use
              // const relativePath = path.relative(context, resourcePath);

              // if (/my-custom-image\.png/.test(resourcePath)) {
              //   return `other_output_path/${url}`;
              // }

              console.log('context: ' + resourcePath);

              if (/img/.test(resourcePath)) {
                return `img/${url}`;
              }

              if (/ico/.test(resourcePath)) {
                return `ico/${url}`;
              }

              return `img/${url}`;
            },

            esModule: false
          }
        }
      }
    ]
  }
};
