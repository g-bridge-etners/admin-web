const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '34.82.68.95',
    port: 3306,
    user: 'hoon',
    password: '0000',
    database: 'gbridge'
});

module.exports= connection;