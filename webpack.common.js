const path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.js',
        vendor: './src/vendor.js'
    },
    resolve: {
        alias: {
            jquery: "jquery/src/jquery"
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            "window.jQuery": 'jquery'
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            }, {
                test: /\.(png|ico|svg|jpg|gif|jpeg)$/i,
                use:
                {
                    loader: 'file-loader',
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: (url, resourcePath, context) => {
                            // `resourcePath` is original absolute path to asset
                            // `context` is directory where stored asset (`rootContext`) or `context` option

                            // To get relative path you can use
                            // const relativePath = path.relative(context, resourcePath);

                            // if (/my-custom-image\.png/.test(resourcePath)) {
                            //   return `other_output_path/${url}`;
                            // }

                            console.log("context: " + resourcePath);

                            if (/img/.test(resourcePath)) {
                                return `img/${url}`;
                            }

                            if (/ico/.test(resourcePath)) {
                                return `ico/${url}`;
                            }

                            return `img/${url}`;
                        },

                        esModule: false,

                    }
                }
            }

        ]

    }
};