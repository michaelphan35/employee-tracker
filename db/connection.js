const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Silver*Wind2319',
    database: 'tracker'
});

module.exports = db;