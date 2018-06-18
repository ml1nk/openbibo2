import {_read, _del} from '../datatable.mjs';

const config = {
    view: ['id', 'title', 'part', 'author', 'type', 'category', 'typeId', 'categoryId'],
    search: ['title', 'author'],
    table: 'media_overview',
    id: 'id',
};

export async function read(db, req) {
    return await _read(config, req, db);
}

export async function del(db, req) {
    return await _del(db, 'DELETE FROM media WHERE id IN (?)', [req]);
}
