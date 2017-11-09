import {normal} from '../lib/datatable.mjs';

const config = {
    view: ['title', 'part', 'author', 'type', 'category', 'id', 'typeId', 'categoryId'],
    search: ['title', 'author'],
    table: 'mediaOverview',
    id: 'id',
};

export default async (db, req) => {
    return await normal(config, req, db);
};
