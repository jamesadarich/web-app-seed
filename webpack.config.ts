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
    "app": "./app/startup.tsx"
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
  output: {
    filename: "scripts/[name]-[hash].js",
    chunkFilename: "scripts/[name]-[hash].js",
    path: buildPath,
    publicPath: "/"
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          }
        }
      }
    }
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
