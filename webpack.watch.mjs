import webpack from 'webpack';
import gutil from 'gutil';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import BundleAnalyzer from 'webpack-bundle-analyzer';
import path from 'path';
import pack from './package.json';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import config from './config.json';
import fs from 'fs';

const version = JSON.stringify(pack).version;
const BundleAnalyzerPlugin = BundleAnalyzer.BundleAnalyzerPlugin;

fs.readdirSync('./public').forEach((file, index)=>{
  if (file !== '.gitignore') {
    fs.unlinkSync('./public/'+file);
  }
});

webpack({
  entry: ['./src/client/index.mjs'],
  watch: true,
  output: {
    path: path.join(path.resolve(), 'public'),
    filename: 'index.js',
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
            }],
        }),
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
    }),
    new BundleAnalyzerPlugin({
      reportFilename: 'report.html',
      openAnalyzer: false,
      analyzerMode: 'static',
    }),
    new ExtractTextPlugin('index.css'),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'Popper': 'popper.js'
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
