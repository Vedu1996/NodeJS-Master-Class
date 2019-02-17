const path = require('path');
const currentDir = __dirname;
const hello = require(path.join(currentDir, './hello'));
module.exports = {
    hello
};