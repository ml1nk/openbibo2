import {normal} from '../lib/datatable.mjs';

const config = {
    view: ['id', 'title', 'part', 'author', 'type', 'typeId', 'category', 'categoryId'],
    search: ['title', 'author'],
    table: 'mediaOverview',
    id: 'id',
};

export default async (db, req) => {
    return await normal(config, req, db);
};