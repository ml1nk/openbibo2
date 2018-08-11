const mysql = require('mysql2');
const requireDir = require('require-dir');

const tables = requireDir("./../datatable");

const helper = {
    del : del,
    read : read
}

module.exports = (io, db) => {
    io.on('datatable', processing.bind(null, db));
};

async function processing(db, req, callback) {

    if (!req.name
    || !req.type
    || !req.data
    || !tables[req.name]
    || !tables[req.name][req.type]) {
        return;
    }

    let res = await tables[req.name][req.type](db, helper, req.data);
    if ( req.type === 'read' ) {
        res.draw = req.data.draw;
    }

    callback(res);
}

function _ordering(order, columns) {
    if (order.length===0) {
        return '';
    }

    let sql = ' ORDER BY';
    for (let i=0; i<order.length; i++) {
        sql += (i===0 ? ' ' : ', ')
            + columns[order[i].column]
            + (order[i].dir==='asc' ? ' ASC' : ' DESC');
    }
    return sql;
}


function _match(term, columns, db) {
    return term==='' ? '' :
    ' WHERE MATCH (' + columns.join(', ') + ') AGAINST ('+mysql.escape(term)+' IN BOOLEAN MODE)';
}


function _limit(start, length) {
    let sql = ' LIMIT ' + parseInt(start);
    if (length>0) {
        sql += ', ' + parseInt(length);
    }
    return sql;
}


function _sql(config, req, db) {
    let rows = 'SELECT '+ config.view.join(', ') +' FROM '+config.table;
    let where = _match(req.search.value, config.search, db);
    rows += where;
    rows += _ordering(req.order, config.view);
    rows += _limit(req.start, req.length);

    let filtered = where==='' ? false : 'SELECT COUNT('+config.id+') FROM '+config.table + where;
    let total = 'SELECT COUNT('+config.id+') FROM '+config.table;

    return [rows, filtered, total];
}

async function _execute(rows, filtered, total, db) {
    rows = db.query({
        sql: rows,
        rowsAsArray: true,
    });
    rows.catch((e) => {
        console.warn(e);
    });

    if (filtered) {
        filtered = db.query({
            sql: filtered,
            rowsAsArray: true,
        });
        filtered.catch((e) => {
            console.warn(e);
        });
    }


    total = db.query({
        sql: total,
        rowsAsArray: true,
    });
    total.catch((e) => {
        console.warn(e);
    });


    try {
        total = (await total)[0][0];
    } catch (e) {
        total = 0;
    }

    try {
        filtered = filtered ? (await filtered)[0][0] : total;
    } catch (e) {
        filtered = 0;
    }

    try {
        rows = (await rows)[0];
    } catch (e) {
        rows = [];
    }

    return {
        recordsTotal: total,
        recordsFiltered: filtered,
        data: rows,
    };
}

async function read(config, req, db) {
    let [rows, filtered, total] = _sql(config, req, db);
    return await _execute(rows, filtered, total, db);
}

async function del(db, query, params) {
    try {
        let [results] = await db.query(query, params);
        return results.affectedRows;
    } catch (e) {s
        console.error(e);
    }
    return false;
}
