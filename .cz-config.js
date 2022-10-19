'use strict';

module.exports = {
    // 可选类型
    types: [
        { value: ':sparkles: feat', name: '✨  feat:  新功能' },
        { value: ':bug: fix', name: '🐛  fix:  修复' },
        { value: ':memo: docs', name: '📝  docs:  撰写文档' },
        { value: ':style: style', name: '🎨  代码格式(不影响代码运行的变动)' },
        {
            value: ':hammer: refactor',
            name: '🔨  refactor:  重构(既不是增加feature，也不是修复bug)',
        },
        { value: ':wrench: chore', name: '🔧  chore: 修改配置文件' },
        { value: ':zap: perf', name: '⚡️  perf:  性能优化' },
        { value: ':white_check_mark: test', name: '✅  test:  增加测试' },
        {
            value: ':construction_worker: ci',
            name: '👷  ci:  更改持续集成软件配置文件和package中script命令 ',
        },
        { value: ':construction: wip', name: '🚧  wip: 工作进行中' },
        { value: ':revert: revert', name: '⏪️  revert:   回退' },
        {
            value: ':package: build',
            name: '📦️  build:    变更项目构建或外部依赖（webpackgulp\npm等）',
        },
    ],
    // 消息步骤
    messages: {
        type: '请选择提交类型:',
        scope: '\n更改的范围（可选）：',
        customScope: '请输入修改范围(可选):',
        subject: '请简要描述提交(必填):',
        body: '请输入详细描述(可选):',
        footer: '请输入要关闭的issue(可选)例: #31, #34:\n:',
        breaking: '不兼容变动（可选）:\n',
        confirmCommit: '确认使用以上信息提交？(y/n/e/h)',
    },
    scopes: [
        { name: 'react' },
        { name: 'sdk' },
        { name: 'vue' },
        { name: 'other' },
    ],
    allowCustomScopes: true,
    // 跳过问题
    skipQuestions: ['body', 'footer'],
    allowBreakingChanges: ['feat', 'fix'],
    // subject文字长度默认是72
    subjectLimit: 72,
};
