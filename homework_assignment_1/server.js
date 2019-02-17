// Dependencies
const currentDir = __dirname;
const path = require('path');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const handlers = require(path.join(currentDir, 'lib/handlers'));
const router = require(path.join(currentDir, 'lib/router'))(handlers);

module.exports = (req, res) => {
    // Get URL
    const parsedUrl = url.parse(req.url, true);
    // Get Path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '').trim();
    // Get Headers
    const headers = req.headers;
    // Get Query Strings
    const queryStringObject = parsedUrl.query;
    // Get HTTP Method
    const method = req.method.toLowerCase();
    // Get Request payload
    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', (data) => {
        buffer += decoder.write(data);
    });
    req.on('end', () => {
        buffer += decoder.end();
        // Construct data to send to handler
        const data = {
            trimmedPath,
            queryStringObject,
            method,
            headers,
            body: buffer
        };
        // Choose handler
        const chosenHandler = router.dispatch(data);
        // Log request path
        console.log(`Request received: \x1b[32m${method.toUpperCase()}\x1b[0m ${trimmedPath}`);
        chosenHandler(data, (statusCode, payload) => {
            statusCode = typeof statusCode === 'number' ? statusCode : 200;
            payload = typeof payload === 'object' ? payload : {};
            // Convert payload to string
            var payloadString = JSON.stringify(payload);
            // Send response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
        });
    });
};
