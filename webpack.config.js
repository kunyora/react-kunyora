const webpack = require("webpack");
const path = require("path");
const fs = require("fs");

let nodeModules = {};
fs
  .readdirSync("node_modules")
  .filter(function(x) {
    return [".bin"].indexOf(x) == -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = "commonjs " + mod;
  });

module.exports = {
  entry: "./index.js",
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: "babel-loader",
        exclude: "/node_modules/"
      }
    ]
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/dists/",
    filename: "react-composer.js",
    libraryTarget: "commonjs2"
  },
  target: "node",
  externals: nodeModules,
  devtool: "source-map"
};
