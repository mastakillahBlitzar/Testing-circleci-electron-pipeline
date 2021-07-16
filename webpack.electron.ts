import { Configuration } from "webpack";
import * as path from "path";

const config: Configuration[] = [
  {
    mode: "development",
    entry: "./src/main/main.ts",
    target: "electron-main",
    resolve: {
      alias: {
        ["@"]: path.resolve(__dirname, "src")
      },
      extensions: [".ts", ".js"]
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          include: /src/,
          exclude: ["/src/preload/", /node_modules/],
          use: [{ loader: "ts-loader" }]
        },
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"]
        },
        {
          test: /\.node$/,
          loader: "node-loader"
        }
      ]
    },
    node: {
      __dirname: false,
      __filename: false
    },
    output: {
      path: __dirname + "/dist",
      filename: "main.js"
    }
  },
  {
    entry: {
      "preload-window": "./src/preload/preload-window.ts",
      "preload-view": "./src/preload/preload-view.ts"
    },
    target: "electron-preload",
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [{ loader: "ts-loader" }]
        }
      ]
    },
    output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].js"
    }
  }
];

export default config;
