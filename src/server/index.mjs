import fs from 'fs';
import socket from './socket.mjs';
import server from './http2.mjs';
import mysql from './mysql.mjs';
import datatable from './datatable.mjs';
import auth from './auth.mjs';

import config from './config';

const tls = {
    key: fs.readFileSync(config.tls.key),
    cert: fs.readFileSync(config.tls.cert),
    ca: config.tls.ca ? fs.readFileSync(config.tls.ca) : undefined,
};

(async () => {
    const ser = await server(tls, './public');
    const [io, ioser] = socket(tls);
    const db = mysql(config.db);

    io.on('connection', (socket) => {
        const user = {
            auth: false
        };

        auth(socket, db, user, config.pepper);
        datatable(socket, db); // register js access
    });

    // console.log(await create(db, "hallo", "test", config.pepper));
    // console.log(await remove(db, 37, "hallo", "test", config.pepper));

    ioser.listen(config.port.websocket);
    ser.listen(config.port.http2, {
        wsEngine: 'uws'
    });
})();

process.on('unhandledRejection', (error) => {
    console.error('unhandledRejection', error);
});
