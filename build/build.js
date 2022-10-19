const rollup = require('rollup');
const { configFun, outputs } = require('./node.config');
const { omit } = require('lodash');

outputs.forEach(async (output) => {
    let options = {
        isUglify: output.isUglify,
        isExternal: output.isExternal,
    };
    const inputOptions = configFun(options);
    build(inputOptions, omit(output, ['isUglify', 'isExternal']));
});

async function build(inputOptions, outputOptions) {
    console.log(`[INFO] 开始编译 ${inputOptions.input}`);
    const bundle = await rollup.rollup(inputOptions);
    // const res = await bundle.generate(outputOptions);
    // console.log(`[INFO] ${res}`);
    await bundle.write(outputOptions);
    console.log(`[SUCCESS] 编译结束 ${outputOptions.file}`);
}
