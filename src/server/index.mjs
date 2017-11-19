import fs from 'fs';
import socket from './lib/socket.mjs';
import server from './lib/http2.mjs';
import mysql from './lib/mysql.mjs';
import datatable from './lib/datatable.mjs';
// import {remove} from './lib/auth.mjs';
import config from './../../config.json';

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
        datatable(socket, db);
    });

    // console.log(await create(db, "hallo", "test", config.pepper));
    // console.log(await remove(db, 37, "hallo", "test", config.pepper));

    ioser.listen(config.port.websocket);
    ser.listen(config.port.http2);
})();

process.on('unhandledRejection', (error) => {
    console.error('unhandledRejection', error);
});
