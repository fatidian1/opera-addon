const commonjs = require("@rollup/plugin-commonjs");
const json = require("@rollup/plugin-json");
const {nodeResolve} = require("@rollup/plugin-node-resolve");

const config = {
    input: "index.js",
    output: {
        esModule: true,
        file: "dist/index.js",
        format: "es",
        sourcemap: true,
        inlineDynamicImports: true,
    },
    plugins: [commonjs(), json(), nodeResolve({preferBuiltins: true})],
};

module.exports = config;
