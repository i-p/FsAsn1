var path = require("path");
var webpack = require("webpack");

// WORKAROUND https://github.com/webpack/webpack/issues/4530
function capitalizeDriveLetter(path) {
    return path.charAt(0).toUpperCase() + path.slice(1);
}

var cfg = {
  devtool: "source-map",
  entry: "./Viewer.js",
  output: {
    path: capitalizeDriveLetter(path.join(__dirname, "public")),
    filename: "bundle.js"
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
  }
};

module.exports = cfg;