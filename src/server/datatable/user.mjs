import {_read} from '../datatable.mjs';

const readConfig = {
    view: ['id', 'name', 'email', 'barcode', 'active'],
    search: ['barcode', 'name', 'email'],
    table: 'user_overview',
    id: 'id',
};

export async function read(db, req) {
    return await _read(readConfig, req, db);
}
