const json = require('rollup-plugin-json');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const { eslint } = require('rollup-plugin-eslint');
const { terser } = require('rollup-plugin-terser');
const path = require('path');
const pkg = require('../package.json');

const isDev = process.env.NODE_ENV !== 'production';
const { name: PROJECT, version: VERSION } = pkg;
const DATE = new Date();
const resolveFile = function (filePath) {
    return path.join(__dirname, '..', filePath);
};

module.exports.outputs = [
    {
        file: resolveFile('lib/index.js'),
        format: 'cjs',
        isExternal: true,
        exports: 'auto',
    },
    {
        file: resolveFile('es/index.js'),
        format: 'es',
        isExternal: true,
    },
    {
        file: resolveFile('dist/index.js'),
        format: 'umd',
        name: 'tool',
        isExternal: true,
        globals: {
            lodash: '_',
        },
    },
    {
        file: resolveFile('dist/index.min.js'),
        format: 'umd',
        name: 'tool',
        isUglify: true,
        isExternal: true,
        globals: {
            lodash: '_',
        },
    },
].map((i) => {
    i.sourcemap = isDev;
    return i;
});

module.exports.configFun = function config({ isUglify, isExternal } = {}) {
    return {
        input: resolveFile('src/index.js'),
        plugins: [
            commonjs(),
            json(),
            resolve({
                // 将自定义选项传递给解析插件
                customResolveOptions: {
                    moduleDirectory: 'node_modules',
                },
            }),
            eslint({
                throwOnError: true,
                throwOnWarning: true,
                include: ['src/**'],
                exclude: ['node_modules/**'],
            }),
            babel({
                exclude: 'node_modules/**', // 只编译源码
                runtimeHelpers: true,
            }),
            ...(isUglify
                ? [
                    terser({
                        compress: {
                            // remove console.log
                            pure_funcs: ['console.log'],
                        },
                        output: {
                            // add comment on the top
                            preamble: `/*! ${PROJECT} - v${VERSION} - ${DATE} https://xiaochengzi.github.io */`,
                        },
                    }),
                ]
                : []),
        ],
        // 作用：指出应将哪些模块视为外部模块，否则会被打包进最终的代码里
        external: (id) => {
            return !isExternal
                ? false
                : /@babel\/runtime/.test(id) || /lodash/.test(id);
        },
    };
};
