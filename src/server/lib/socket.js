const https = require('https');
const socket = require('socket.io');

module.exports = (options) => {
    const server = https.createServer({
        key: options.key,
        cert: options.cert,
        ca: options.ca,
        requestCert: false,
        rejectUnauthorized: false,
    });

    return [socket(server, {
        serveClient: false,
    }), server];
};
