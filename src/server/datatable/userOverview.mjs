import {normal} from '../lib/datatable.mjs';

const config = {
    view: ['id', 'name', 'email', 'barcode', 'active'],
    search: ['barcode', 'name', 'email'],
    table: 'userOverview',
    id: 'id',
};

export default async (db, req) => {
    return await normal(config, req, db);
};
