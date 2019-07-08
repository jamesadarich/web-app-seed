import { resolve } from "path";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as HtmlTextPlugin from "html-webpack-plugin";
import { Configuration } from "webpack";

const buildPath = resolve(__dirname, "dist");

const WebpackConfig: Configuration = {
  entry: {
    "app": "./app/startup.tsx"
    /*,
    "no-script": "./app/styles/stylesheets/no-script.scss",
    "unsupported-browser": "./app/styles/stylesheets/unsupported-browser.scss",
    */
  },
  output: {
    path: buildPath,
    filename: "scripts/[name]-[hash].js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          //"style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles/[name]-[contenthash].css",

    }),
    new HtmlTextPlugin({
      filename: "index.html",
      // inject: false,
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
