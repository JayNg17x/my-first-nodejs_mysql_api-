const mysql = require('mysql2');
const dbConfig = require('../config/db.config');

// Create a connection to database
const con = mysql.createConnection({
	host: dbConfig.HOST,
	user: dbConfig.USER,
	password: dbConfig.PASSWORD,
	database: dbConfig.DATABASE,
	socketPath: dbConfig.SOCKETPATH
});

// Open mysql connection
con.connect((err) => {
	if(err) console.err('Error', err);
	console.log('Successfully connected to database...');
});


module.exports = con;

