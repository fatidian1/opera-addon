const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');
const typescript = require('@rollup/plugin-typescript');
const {nodeResolve} = require('@rollup/plugin-node-resolve');

const config = {
    input: 'index.js',
    output: {
        esModule: true,
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
        inlineDynamicImports: true,
    },
    plugins: [commonjs(), json(), typescript({
        tsconfig: false,
        allowJs: true,
        checkJs: false,
        include: ['**/*.{ts,tsx,js}'],
        exclude: ['node_modules/**', 'dist/**'],
    }), nodeResolve({preferBuiltins: true})]
}

module.exports = config;
