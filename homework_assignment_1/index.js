//Dependencies
const http = require('http');
const https = require('https');

const config = require('./config');
const httpsServerOptions = require('./lib/https');
const unifiedServer = require('./server.js');

// Creating servers
const httpServer = http.createServer(unifiedServer);
const httpsServer = https.createServer(httpsServerOptions, unifiedServer);

console.log(`Using environment ${config.envName}`);

// Setting up the servers on ports
httpServer.listen(config.httpPort, () => {
    console.log(`Listening on port ${config.httpPort}`);
});

httpsServer.listen(config.httpsPort, () => {
    console.log(`Listening on port ${config.httpsPort}`);
});