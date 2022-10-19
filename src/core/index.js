/**
 * 验证邮箱
 * @param {*} s
 * @returns
 */
const isEmail = (s) => {
    return /^([a-zA-Z0-9_-)+@([a-zA-Z0-9_-)+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(
        s,
    );
};

/**
 * 验证手机号码
 * @param {*} s
 */
const isMobile = (s) => {
    return /^1[0-9]{10}$/.test(s);
};

/**
 * 电话号码
 * @param {*} s
 * @returns
 */
const isPhone = (s) => {
    return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s);
};

/**
 * 是否url地址
 * @param {*} s
 * @returns
 */

const isUrl = (s) => {
    return /^http[s]?:\/\/.*/.test(s);
};

const random = () => {
    return Math.random().toString(32).slice(-6);
};

export { isEmail, isMobile, isPhone, isUrl, random };
