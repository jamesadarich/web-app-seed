import { resolve } from "path";
import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import * as HtmlTextPlugin from "html-webpack-plugin";
import { Configuration } from "webpack";

const buildPath = resolve(__dirname, "dist");

const WebpackConfig: Configuration = {
  entry: {
    "app": "./app/startup.tsx",
    "no-script": "./app/styles/stylesheets/no-script.scss",
    "unsupported-browser": "./app/styles/stylesheets/unsupported-browser.scss",
  },
  output: {
    path: buildPath,
    filename: "scripts/[name]-[chunkhash].js",
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
      filename: "styles/[name]-[chunkhash].css",
    }),
    new HtmlTextPlugin({
      filename: "index.html",
      inject: false,
      minify: true as any,
      template: "app/index.html"
    })
  ],
  devServer: {
    compress: true,
    contentBase: buildPath,
    historyApiFallback: true,
    hot: true,
    port: 3000,
    public: "webappseed.localtunnel.me"
  }
};

export default WebpackConfig;
