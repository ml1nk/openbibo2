import {normal} from '../lib/datatable.mjs';

const config = {
    view: ['id', 'barcode', 'name', 'email', 'active'],
    search: ['barcode', 'name', 'email'],
    table: 'userOverview',
    id: 'id',
};

export default async (db, req) => {
    return await normal(config, req, db);
};
