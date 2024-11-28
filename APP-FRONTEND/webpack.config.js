const webpack = require('webpack');
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  mode: "production",
  entry: {
    main: "./src/assets/js/main.js",
    submissions: "./src/assets/js/submissions.js",
  },
  output: {
    filename: "assets/js/[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"), 
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/images",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), 
    new MiniCssExtractPlugin({
      filename: "assets/css/styles.[contenthash].css", 
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["main"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/submissions.html",
      filename: "pages/submissions.html", 
      chunks: ["submissions"],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/assets/images", 
          to: "assets/images",
        },
      ],
    }),
    new webpack.DefinePlugin({
      'process.env.APP_API_URL': JSON.stringify(process.env.APP_API_URL || 'http://localhost:3000/api'),
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
