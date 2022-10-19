const path = require('path');
const shelljs = require('shelljs');
const program = require('commander');
const pkg = require('../package.json');

const resolveFile = function (filePath) {
    return path.join(__dirname, '..', filePath);
};
const targetFile = resolveFile('package.json');

const { version: VERSION } = pkg;
const versionArr = VERSION.split('.');
const [mainVersion, subVersion, phaseVersion] = versionArr;

// 默认版本号
const defaultVersion = `${mainVersion}.${subVersion}.${+phaseVersion + 1}`;

let newVersion = defaultVersion;

program.option('-v, --version <type>', 'Add release version number', defaultVersion);
program.parse(process.argv);

console.log('newVersion:', newVersion);

function publish () {
    shelljs.sed('-i', '"name": "tool"', '"name":"tool"', targetFile);
    shelljs.sed('-i', `version: "${VERSION}"`, `version: "${newVersion}"`, targetFile);
    shelljs.exec('npm run build');
    shelljs.exec('npm run publish');
}

publish();

