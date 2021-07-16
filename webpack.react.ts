import * as path from "path";
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  mode: "development",
  entry: "./src/renderer/renderer.tsx",
  target: "web",
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist/renderer.js"),
    compress: true,
    port: 9000
  },
  resolve: {
    alias: {
      ["@"]: path.resolve(__dirname, "src")
    },
    extensions: [".tsx", ".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        include: /src/,
        exclude: /node_modules/,
        use: [{ loader: "ts-loader" }]
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  output: {
    path: __dirname + "/dist",
    filename: "renderer.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};

export default config;
