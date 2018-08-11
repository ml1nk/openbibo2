
const config = {
    view: ['id', 'title', 'part', 'author', 'type_name', 'category_name', 'type', 'category'],
    search: ['title', 'author'],
    table: 'media_overview',
    id: 'id',
};

exports.read = async (db, helper, req) => {
    return await helper.read(config, req, db);
}

exports.del = async (db, helper, req) => {
    return await helper.del(db, 'DELETE FROM media WHERE id IN (?)', [req]);
}
