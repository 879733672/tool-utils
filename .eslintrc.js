// 根目录下新建文件 .eslintrc.js:
module.exports = {
    //一旦配置了root，ESlint停止在父级目录中查找配置文件
    root: true,
    parser: '@babel/eslint-parser',
    //想要支持的JS语言选项
    parserOptions: {
        //启用ES6语法支持(如果支持es6的全局变量{env: {es6: true}}，则默认启用ES6语法支持)
        //此处也可以使用年份命名的版本号：2015
        ecmaVersion: 6,
        //默认为script
        sourceType: 'module',
        //支持其他的语言特性
        ecmaFeatures: {
            arrowFunctions: true,
            destructuring: true,
            classes: true,
        },
    },
    //代码运行的环境，每个环境都会有一套预定义的全局对象，不同环境可以组合使用
    env: {
        amd: true, // 否则会出现'require' is not defined 提示
        es6: true,
        browser: true,
        jquery: true,
        node: true,
    },
    //访问当前源文件中未定义的变量时，no-undef会报警告。
    //如果这些全局变量是合规的，可以在globals中配置，避免这些全局变量发出警告
    globals: {
        //配置给全局变量的布尔值，是用来控制该全局变量是否允许被重写
        test_param: true,
        window: true,
        process: false,
    },
    //支持第三方插件的规则，插件以eslint-plugin-作为前缀，配置时该前缀可省略
    //检查vue文件需要eslint-plugin-vue插件
    // plugins: ["vue"],
    //集成推荐的规则
    // extends: ["eslint:recommended", "plugin:vue/essential"],
    extends: ['eslint:recommended'],
    //启用额外的规则或者覆盖默认的规则
    //规则级别分别：为"off"(0)关闭、"warn"(1)警告、"error"(2)错误--error触发时，程序退出
    rules: {
        //关闭“禁用console”规则
        'no-console': 'off',
        //缩进不规范警告，要求缩进为2个空格，默认值为4个空格
        indent: [
            'warn',
            4,
            {
                //设置为1时强制switch语句中case的缩进为2个空格
                SwitchCase: 1,
            },
        ],
        // 函数定义时括号前面要不要有空格
        'space-before-function-paren': [0, 'always'],
        //定义字符串不规范错误，要求字符串使用双引号
        // quotes: ["error", "double"],
        //....
        //更多规则可查看http://eslint.cn/docs/rules/
    },
};
