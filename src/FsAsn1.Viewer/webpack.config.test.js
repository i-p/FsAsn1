var path = require("path");
var webpack = require("webpack");
var nodeExternals = require('webpack-node-externals');

// WORKAROUND https://github.com/webpack/webpack/issues/4530
function capitalizeDriveLetter(path) {
    return path.charAt(0).toUpperCase() + path.slice(1);
}

var cfg = {
  devtool: "source-map",
  target: "node",
  entry: ["./ParserTests.js", "./FParsecTests.js", "./ReaderTests.js"],
  output: {
    path: capitalizeDriveLetter(path.resolve(__dirname)),
    filename: "tests.bundle.js"
  },
  context: capitalizeDriveLetter(path.resolve(__dirname)),
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
  })],
  plugins: [
      new webpack.ProvidePlugin({ TextDecoder: ['text-encoding', 'TextDecoder'] })
  ]
};

module.exports = cfg;