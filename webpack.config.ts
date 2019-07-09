import * as HtmlTextPlugin from "html-webpack-plugin";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import { resolve } from "path";
import { Configuration } from "webpack";

const buildPath = resolve(__dirname, "dist");

const WEBPACK_CONFIG: Configuration = {
  devServer: {
    compress: true,
    contentBase: buildPath,
    historyApiFallback: true,
    hot: true,
    port: 3000,
    public: "webappseed.localtunnel.me"
  },
  entry: {
    app: "./app/startup.tsx"
    /*,
    "no-script": "./app/styles/stylesheets/no-script.scss",
    "unsupported-browser": "./app/styles/stylesheets/unsupported-browser.scss",
    */
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: "ts-loader"
      },
      {
        test: /\.scss$/,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  output: {
    filename: "scripts/[name]-[hash].js",
    path: buildPath,
    publicPath: "/"
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
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  }
};

export default WEBPACK_CONFIG;
