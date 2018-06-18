import mysql from 'mysql2/promise';

export default (options) => {
    return mysql.createPool(options);
};
