const { spawn } = require("child_process");
const { NoEmitOnErrorsPlugin } = require("webpack");

class WebpackJekyllPlugin {
    constructor(script) {
        this.running = false;
        this.script = script;
        this.data = "";
        this.error = "";
    }

    apply(compiler) {
        var logger = compiler.getInfrastructureLogger("WebpackJekyllPlugin");

        compiler.hooks.beforeCompile.tapAsync(
            "WebpackJekyllPlugin",
            (compilation, callback) => {
                var proc = spawn(this.script);
                this.running = true;
                this.data = "";
                this.error = "";

                proc.stdout.on("data", (data) => {
                    this.data += data;
                });

                proc.stderr.on("data", (data) => {
                    this.error += data;
                });

                proc.on("close", (code) => {
                    this.data = this.data.trim();
                    this.error = this.error.trim();

                    this.running = false;
                });

                callback();
            }
        );

        compiler.hooks.afterCompile.tapAsync(
            "WebpackJekyllPlugin",
            (compilation, callback) => {
                var id = setInterval(() => {
                    if (!this.running) {
                        if (!this.error) {
                            logger.info(
                                `Jekyll compiled successfully\n${this.data}`
                            );
                        } else {
                            compilation.errors.push(
                                new Error(
                                    `Jekyll compilation failed: ${this.error}`
                                )
                            );
                        }

                        clearInterval(id);
                        callback();
                    }
                }, 50);
            }
        );
    }
}

module.exports = WebpackJekyllPlugin;
