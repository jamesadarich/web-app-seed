const path = require("path");
const fs = require("fs");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const buildPath = path.resolve(__dirname, "dist");
const production = process.argv.indexOf("--optimize-minimize") > -1;
const buildWebAppHtml = require("./scripts/build-html").buildWebAppHtml;

module.exports = {
  entry: {
    "app-startup": "./app/scripts/app/startup.ts",
    "legacy-app-loading": "./app/scripts/app-loading/legacy-app-loading.ts",
    "loading": "./app/styles/stylesheets/loading.scss",
    "no-script": "./app/styles/stylesheets/no-script.scss",
    "unsupported-browser": "./app/styles/stylesheets/unsupported-browser.scss",
  },
  output: {
    path: buildPath,
    filename: production ? "scripts/[name]-[chunkhash].js" : "scripts/[name]-[hash].js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
            "style-loader",
            "css-loader"
        ],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [ "css-loader", "sass-loader" ]
        }),
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: production ? "styles/[name]-[chunkhash].css" : "styles/[name]-[hash].css",
    }),
    function() {
      this.plugin("done", buildWebAppHtml);
    }
  ],
  devServer: {
    compress: true,
    contentBase: buildPath,
    historyApiFallback: true,
    port: 3000,
    public: "webappseed.localtunnel.me"
  }
};
