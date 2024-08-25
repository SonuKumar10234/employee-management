const mysql = require('mysql2');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password@123',
    database: 'employees'
});

mysqlConnection.connect((err) => {
    if (err) {
        console.error('Database connection Error: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
})

module.exports = mysqlConnection;