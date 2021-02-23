var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'yuanbolin',
    password: '123456',
    database: 'cms'
});

module.exports={
    mysql,
    pool
}
