const webpack = require("webpack");
const path = require("path");

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
        exclude: "/node_modules/",
      }
    ]
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/dists/",
    filename: "react-composer.js"
  },
  devtool: "source-map"
};
