import {normal} from '../lib/datatable.mjs';

const config = {
    view: ['id', 'title', 'part', 'author', 'type', 'category', 'typeId', 'categoryId'],
    search: ['title', 'author'],
    table: 'mediaOverview',
    id: 'id',
};

export async function read(db, req) {
    return await normal(config, req, db);
}

export async function write(db, req) {
    return await normal(config, req, db);
}
