const scrypt = require('@mlink/scrypt');

async function remove(db, id) {
    try {
        let [res] = await db.query('DELETE FROM manager WHERE id=?', [id]);
        return res.affectedRows>0;
    } catch (e) {
        console.error(e);
        return false;
    }
}

async function create(db, username, password, forename, surname, pepper) {
    let h = await hash(password+pepper);
    try {
        let [res] = await db.query('INSERT INTO manager (username, password, forename, surname) VALUE (?,UNHEX(?),?,?)', [username, h.toString('hex'), forename, surname]);
        return res.affectedRows>0;
    } catch (e) {
        console.error(e);
        return false;
    }
}

async function update(db, id, password, forename, surname, pepper) {
    let h = await hash(password+pepper);
    try {
        let [res] = await db.query('UPDATE manager SET password=UNHEX(?), forename=?, surname=? WHERE id=', [h.toString('hex'), id, forename, surname]);
        return res.affectedRows>0;
    } catch (e) {
        console.error(e);
        return false;
    }
}

async function login(db, username, password, pepper) {
   try {
        let [res] = await db.query('SELECT id, password, forename, surname FROM manager WHERE username=?', [username]);
        if (res.length!==1) {
            return false;
        }
        return scrypt.verifyKdfSync(res[0].password, password+pepper) ?  {
            id: res[0].id, 
            forename: res[0].forename,
            surname: res[0].surname
        } : false;
    } catch (e) {
        console.error(e);
        return false;
    }
}

async function hash(text) {
    let para = await scrypt.params(0.1);
    return await scrypt.kdf(text, para);
}

exports.remove = remove;
exports.create = create;
exports.update = update;
exports.login = login;
