import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import typescript from '@rollup/plugin-typescript'
import {nodeResolve} from '@rollup/plugin-node-resolve'

const config = {
    input: 'index.js',
    output: {
        esModule: true,
        file: 'dist/index.js',
        format: 'es',
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

export default config;
