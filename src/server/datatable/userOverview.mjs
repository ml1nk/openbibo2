import {normal} from '../lib/datatable.mjs';

const config = {
    view: ['barcode', 'name', 'email', 'active', 'id'],
    search: ['barcode', 'name', 'email'],
    table: 'userOverview',
    id: 'id',
};

export default async (db, req) => {
    return await normal(config, req, db);
};
