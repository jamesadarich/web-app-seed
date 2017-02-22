const ExtractTextPlugin = require("extract-text-webpack-plugin");
const fs = require("fs");
const path = require("path");

module.exports = [
  {
    name: "app",
    entry: {
      "app-startup": "./app/scripts/app/startup.ts",
      "legacy-app-loading": "./app/scripts/app-loading/legacy-app-loading.ts"
    },
    output: {
      filename: "[name]-[chunkhash].js",
      path: "./dist/scripts"
    },
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: [".ts", ".tsx", ".js"] // note if using webpack 1 you"d also need a "" in the array as well
    },
    plugins: [
      function() {
        this.plugin("done", function(stats) {
          const cacheBustMappingPath = path.join(__dirname, "/dist/cache-bust-mapping/");

          if (!fs.existsSync(cacheBustMappingPath)) {
            fs.mkdirSync(cacheBustMappingPath);
          }

          fs.writeFileSync(cacheBustMappingPath + "scripts.json",
            JSON.stringify(stats.toJson()));
          });
      }
    ],
    module: {
      loaders: [ 
        // loaders will work with webpack 1 or 2; but will be renamed "rules" in future
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        { 
          "test": /\.tsx?$/,
          loader: "ts-loader"
        },
        {
          test: /\.scss$/,
          loaders: [ "style-loader", "css-loader", "sass-loader" ]
        }
      ]
    }
  },
  {
    name: "additional-styles",
    entry: {
      "loading": "./app/styles/stylesheets/loading.scss",
      "no-script": "./app/styles/stylesheets/no-script.scss",
      "unsupported-browser": "./app/styles/stylesheets/unsupported-browser.scss",
    },
    output: {
      filename: "[name]-[chunkhash].css",
      path: "./dist/styles"
    }, 
    plugins: [
      new ExtractTextPlugin("[name]-[chunkhash].css"),
      function() {
        this.plugin("done", function(stats) {

          const cacheBustMappingPath = path.join(__dirname, "/dist/cache-bust-mapping/");

          if (!fs.existsSync(cacheBustMappingPath)) {
            fs.mkdirSync(cacheBustMappingPath);
          }

          fs.writeFileSync(cacheBustMappingPath + "stylesheets.json",
            JSON.stringify(stats.toJson()));
          });
      }
    ],
    module: {
      loaders: [ 
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract([ "css-loader", "sass-loader" ])
        }
      ]
    }
  }
]