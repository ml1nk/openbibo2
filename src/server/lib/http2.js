const http2 = require('http2');
const fs = require('fs-extra');
const mime = require('mime');
const walker = require('walker/lib/walker');


const {
    HTTP2_HEADER_PATH,
  } = http2.constants;

module.exports  = async (options, path) => {
    const ser = http2.createSecureServer(options);
    const files = [];
    const obj = {};

    let search = new Promise((resolve, reject) => {
        walker(path)
        .on('file', async (file, stat) => {
            let data = fs.readFile(file);
            files.push(data);
            obj[file.substring(path.length-2)] = [await data, {
                'content-length': stat.size,
                'last-modified': stat.mtime.toUTCString(),
                'content-type': mime.getType(file),
            }];
        })
        .on('error', (er, entry, stat) => {
          console.error(er, entry);
          reject();
        })
        .on('end', () => {
          resolve();
        });
    });

    await search;
    await Promise.all(files);

    ser.on('stream', (stream, headers) => {
        const reqPath = headers[HTTP2_HEADER_PATH];

        if (!obj.hasOwnProperty(reqPath)) {
            stream.respond({':status': 404});
            stream.end();
            return;
        }

        stream.respond(obj[reqPath][1]);
        stream.end(obj[reqPath][0]);
    });

    return ser;
};
