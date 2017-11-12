import {normal} from '../lib/datatable.mjs';

const config = {
    view: ['id', 'name', 'email', 'barcode', 'active'],
    search: ['barcode', 'name', 'email'],
    table: 'userOverview',
    id: 'id',
};

export async function read(db, req) {
    return await normal(config, req, db);
}

export async function write(db, req) {
    return await normal(config, req, db);
}
