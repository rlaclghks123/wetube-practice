const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const BASEJS = "./src/clients/js/";
module.exports = {
    entry: {
        main: BASEJS + "main.js",
        videoPlay: BASEJS + "videoPlay.js",
    },
    mode: "development",
    plugins: [new MiniCssExtractPlugin({ filename: "css/styles.css" })],
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, "assets"),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [["@babel/preset-env", { targets: "defaults" }]],
                    },
                }
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            }
        ]
    }
}