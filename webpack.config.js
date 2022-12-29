// @ts-check
const NodemonWebpackPlugin = require("nodemon-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const { EnvironmentPlugin } = require("webpack");
const dotenv = require("dotenv");
const DotenvWebpackPlugin = require("dotenv-webpack");
const nodeExternals = require("webpack-node-externals");
const path = require("path");

const env = dotenv.config().parsed;

module.exports = {
  entry: "./src/index.ts",
  target: "node",
  externals: [nodeExternals()],
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    new NodemonWebpackPlugin(),
    new CaseSensitivePathsPlugin(),
    !env
      ? new EnvironmentPlugin(Object.keys(process.env))
      : new DotenvWebpackPlugin(),
  ],
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
};
