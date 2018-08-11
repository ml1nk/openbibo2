const auth = require('../mysql/auth.js');

module.exports = (so, db, user, pepper) => {
    so.on('auth/login', async (obj, cb)=>{
       user.auth=await auth.login(db, obj.username, obj.password, pepper);
       if(cb) cb(user.auth);
    });

    so.on('auth/create', async (obj, cb)=>{
        let res = auth.create(db, obj.username, obj.password, obj.forename, obj.surname, pepper);
        if(cb) cb(await res);
    });
}