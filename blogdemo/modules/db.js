let db = require('mysql').createConnection({
	host:'localhost',
	user:'root',
	password:'000000',
	database:'blog'
});
module.exports = db;
