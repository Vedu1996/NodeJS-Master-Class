const path = require('path');
const currentDir = __dirname;
const modules = require(path.join(currentDir, '../../modules'));
module.exports = {
    get: {
        
    },
    post: {
        'hello': modules.hello.sayHello,
        'hello/:name': modules.hello.sayHello,
    },
    put: {

    },
    delete: {

    },
    head: {

    },
    patch: {

    }
};