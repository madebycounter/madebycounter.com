const { exec } = require("child_process");
const WatchExternalFilesPlugin = require("webpack-watch-files-plugin").default;
const path = require("path");

module.exports = {
    entry: "./src/_ts/Main.ts",
    mode: "production",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
                options: {
                    configFile: "tsconfig.json"
                }
            }
        ]
    },
    output: {
        library: "TS",
        path: path.resolve(__dirname, "./src/assets/js/"),
        filename: "bundle.js",
        publicPath: "/assets/js/"
    },
    devServer: {
        hot: true,
        magicHtml: true,
        port: 4000
    },
    plugins: [
        new WatchExternalFilesPlugin({
            files: ["./src/**", "!./src/assets/js/bundle.js"]
        }),
        {
            apply: (compiler) => {
                compiler.hooks.afterEmit.tap("JekyllPlugin", (compilation) => {
                    exec("bundler exec jekyll build", (err, stdout, stderr) => {
                        if (stdout) process.stdout.write(stdout);
                        if (stderr) process.stderr.write(stderr);
                    });
                });
            }
        }
    ]
};
