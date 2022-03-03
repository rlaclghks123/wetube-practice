const path = require("path");

module.exports = {
    entry: {
        main: "./src/clients/js/main.js",
    },
    mode: "development",
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
            }
        ]
    }
}