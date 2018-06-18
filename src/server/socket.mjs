import https from 'https';
import socket from 'socket.io';

export default (options) => {
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
