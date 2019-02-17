// Dependencies
const fs = require('fs');
const path = require('path')
const currentDir = __dirname;

// Read https key and certificate
const httpsServerOptions = {
    key: fs.readFileSync(path.join(currentDir, './key.pem')),
    cert: fs.readFileSync(path.join(currentDir, './cert.pem'))
};

module.exports = httpsServerOptions;