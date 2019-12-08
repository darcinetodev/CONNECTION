const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '002531',
    database: 'servicos_informatica'
});

module.exports = connection;