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
    port: 3000,
    public: "webappseed.localtunnel.me"
  },
  entry: {
    app: "./app/startup.tsx"
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
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: module => {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/]((@.+[\\/])?.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return packageName.replace(/@/g, "").replace(/[\\/]/g, "-");
          },
          test: /[\\/]node_modules[\\/]/
        }
      },
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0
    }
  },
  output: {
    chunkFilename: "scripts/[name]-[contenthash].js",
    filename: "scripts/[name]-[contenthash].js",
    path: buildPath,
    publicPath: "/"
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles/[name]-[contenthash].css",
    }),
    new HtmlTextPlugin({
      filename: "index.html",
      template: "app/index.html"
    })
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  }
};

export default WEBPACK_CONFIG;
