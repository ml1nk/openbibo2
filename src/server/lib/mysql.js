const mysql = require('mysql2/promise');

module.exports = (options) => {
    return mysql.createPool(options);
};
