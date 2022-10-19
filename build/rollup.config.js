import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve'; // Rollup 如何查找外部模块, 其他插件转换你的模块之前 - 这是为了防止其他插件的改变破坏CommonJS的检测
import commonjs from 'rollup-plugin-commonjs'; // CommonJS模块转换为 ES2015 供 Rollup 处理
import { eslint } from 'rollup-plugin-eslint';
import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';
import pkg from '../package.json';
import { omit } from 'lodash';

const path = require('path');
const resolveFile = function (filePath) {
    return path.join(__dirname, '..', filePath);
};

const isDev = process.env.NODE_ENV !== 'production';
const { name: PROJECT, version: VERSION } = pkg;
const DATE = new Date();
// 通过控制outputs中对应的isExternal、isUglify值来决定打包的文件是否启用external和uglify
const outputs = [
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
        globals: {
            lodash: '_',
        },
        isExternal: true,
    },
    {
        file: resolveFile('dist/index.min.js'),
        format: 'umd', //  五种输出格式：amd /  es / iife / umd / cjs
        name: 'tool', // 当format为iife和umd时必须提供，将作为全局变量挂在window(浏览器环境)下：window.A=.
        isUglify: true,
        isExternal: true, // 外部是否打包进去，true不打包进去
        globals: {
            lodash: '_',
        },
    },
].map((i) => {
    i.sourcemap = isDev; // 生成bundle.map.js文件，方便调试
    return i;
});

const len = outputs.length;

const config = outputs.map((output, i) => {
    const isUglify = output?.isUglify || false;
    const isExternal = output?.isExternal || false;
    return {
        input: resolveFile('src/index.js'),
        output: omit(output, ['isUglify', 'isExternal']),
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
                runtimeHelpers: true, // 使plugin-transform-runtime生效
            }),
            ...(isDev && i === len - 1
                ? [
                    serve({
                        // 使用开发服务插件
                        port: 3001,
                        // 设置 exmaple的访问目录和dist的访问目录
                        contentBase: [
                            resolveFile('example'),
                            resolveFile('dist'),
                        ],
                    }),
                ]
                : isUglify
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
        // external: id => /@babel\runtime/.test(id) || /lodash/.test(id),
        // external: id => /lodash/.test(id) // 也可以使用这种方式
        external: (id) => {
            return !isExternal
                ? false
                : /@babel\/runtime/.test(id) || /lodash/.test(id);
        },
    };
});

export default config;
