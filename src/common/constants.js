const { PUBLIC_URL } = process.env;
console.log(process.env, 'process.env');
const STATIC_PATH = `${PUBLIC_URL}/static`;
const IMAGE_PATH = `${STATIC_PATH}/images`;
const LOCALES_PATH = `${STATIC_PATH}/locales`;
const test = 'testConstants';

export default {
    test,
    STATIC_PATH,
    IMAGE_PATH,
    LOCALES_PATH,
};
