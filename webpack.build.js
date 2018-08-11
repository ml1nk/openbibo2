const webpack = require('webpack');
const gutil = require('gutil');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzer = require('webpack-bundle-analyzer');
const path = require('path');
const pack = require('./package.json');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('./src/server/config');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const version = JSON.stringify(pack).version;
const BundleAnalyzerPlugin = BundleAnalyzer.BundleAnalyzerPlugin;

fs.readdirSync('./public').forEach((file, index)=>{
  if (file !== '.gitignore') {
    fs.unlinkSync('./public/'+file);
  }
});

webpack({
  entry: ['./src/client/index.mjs'],
  output: {
    path: path.join(path.resolve(), 'public'),
    filename: 'index.js',
  },
  devtool: 'source-map',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(txt|csv)$/,
        use: 'raw-loader',
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url-loader?limit=100&mimetype=application/font-woff'},
      {
        test: /\.ttf$/,
        loader: 'url-loader?limit=100'},
      {
        test: /\.eot$/,
        loader: 'url-loader?limit=100'},
      {
        test: /\.svg$/,
        loader: 'url-loader?limit=100'},
      {
        test: /\.png$/,
        loader: 'url-loader?limit=100'},
      {
        test: /\.jpg$/,
        loader: 'url-loader?limit=100'},
      {
        test: /\.gif$/,
        loader: 'url-loader?limit=100'},
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.js$/,
        include: [
          path.resolve('.', 'src', 'client'),
          path.resolve('.', 'src', 'shared'),
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: {
                    'chrome': '62',
                    'firefox': '56',
                  },
                  useBuiltIns: 'usage',
                  modules: false,
                }],
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            },
          },
        ]
      },
    ],
  },
  resolve: {
    modules: [
      path.resolve('./node_modules'),
    ],
    alias: {
      'datatables.net': '@mlink/datatables.net',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: true,
      template: './template.ejs',
    }),
    new webpack.DefinePlugin({
        VERSION: version,
        VERSION_TIME: Date.now(),
        WEBSOCKET: config.port.websocket,
        process: {
          env: {
            NODE_ENV: '"production"',
          },
        },
    }),
    new BundleAnalyzerPlugin({
      reportFilename: 'report.html',
      openAnalyzer: false,
      analyzerMode: 'static',
    }),
    new MiniCssExtractPlugin({
      filename: 'index.css',
    }),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'Popper': 'popper.js',
    }),
    new UglifyJSPlugin(
      {
        parallel: true,
        cache: true,
        sourceMap: true,
        uglifyOptions: {
          ie8: false,
          ecma: 6,
          compress: {
            sequences: true,
            dead_code: true,
            drop_debugger: true,
            comparisons: true,
            conditionals: true,
            evaluate: true,
            booleans: true,
            loops: true,
            unused: true,
            hoist_funs: true,
            if_return: true,
            join_vars: true,
            drop_console: true,
          },
        },
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessorOptions: {
          discardComments: {
            removeAll: true,
          },
          map: {
            inline: false
          },
          sourcemap: true,
        },
        canPrint: true,
      }),
  ],
}, (err, stats) => {
  if (err) {
    throw new gutil.PluginError('webpack:build', err);
  }
  gutil.log('[webpack:build]', stats.toString({
    chunks: false, // Makes the build much quieter
    colors: true,
  }));
});
