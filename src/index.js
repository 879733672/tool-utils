import foo from './foo.js';
import { version } from '../package.json';
import _ from 'lodash';
export * as toolRule from './core';

console.log(version, _.defaults({ a: 1 }, { a: 2, b: 2 }));
const a = 2;
console.log(a);
const Tool = function () {
    console.log(foo);
};

export default Tool;
