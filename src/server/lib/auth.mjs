import scrypt from 'scrypt';

export async function remove(db, id) {
    try {
        let [res] = await db.query('DELETE FROM manager WHERE id=?', [id]);
        return res.affectedRows>0;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function create(db, name, password, pepper) {
    let hash = await hash(password+pepper);
    try {
        let [res] = await db.query('INSERT INTO manager (name, password) VALUE (?,UNHEX(?))', [name, hash.toString('hex')]);
        return res.affectedRows>0;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function update(db, id, password, pepper) {
    let hash = await hash(password+pepper);
    try {
        let [res] = await db.query('UPDATE manager SET password=UNHEX(?) WHERE id=', [hash.toString('hex'), id]);
        return res.affectedRows>0;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function login(db, name, password, pepper) {
    try {
        let [res] = await db.query('SELECT id, password FROM manager WHERE name=?', [name]);
        if (res.length!==1) {
            return false;
        }
        return scrypt.verifyKdfSync(res[0].password, password+pepper) ? res[0].id : false;
    } catch (e) {
        console.error(e);
        return false;
    }
}

async function hash(text) {
    let para = await scrypt.params(0.1);
    return await scrypt.kdf(text, para);
}
