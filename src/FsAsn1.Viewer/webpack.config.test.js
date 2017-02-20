var path = require("path");
var webpack = require("webpack");
var nodeExternals = require('webpack-node-externals');

var cfg = {
  devtool: "source-map",
  target: "node",
  entry: ["./ParserTests.js",  "./FParsecTests.js"],  
  output: {
    path: __dirname, //path.join(__dirname, "public"),
    filename: "tests.bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "source-map-loader"
      }
    ]
  },
  resolve: {
	  alias: {
		  fparsec: "./fparsec"
	  }
  },
  externals: [nodeExternals({
	  whitelist: [/^fable-core/]
  })]
};

module.exports = cfg;