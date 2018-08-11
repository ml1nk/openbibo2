const readConfig = {
    view: ['id', 'name', 'email', 'barcode', 'active'],
    search: ['barcode', 'name', 'email'],
    table: 'user_overview',
    id: 'id',
};

exports.read = async (db, helper, req) => {
    return await helper.read(config, req, db);
}

