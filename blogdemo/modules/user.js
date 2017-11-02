let db = require('./db');
let md5 = require('md5');
db.md5 = md5; 
exports.insert = (data,cb)=>{
	let query = 'insert into users set ?';
	data.pass = db.md5(data.pass);
	db.query(query,data,(err)=>{
		if(err){
			return cb(err);
		}
		cb(null);
	})

}
exports.author = (email,password,cb)=>{
	let query = 'select * from users where email = ?';
	 db.query(query,email,(err,row)=>{
		
		 if(!row[0]){
		 	return cb({msg:'用户名不存在'})  ;
		 }
		 if(err){
			return cb(err);
		}
		if(row[0].pass==db.md5(password)){
			return cb(null,row[0]);
		}
		cb({msg:'用户名或者密码错误'});

	});	    
}
exports.show = (id,cb)=>{
	let query = 'select * from users where id = ?';
	db.query(query,id,(err,row)=>{
		if(err){
			return cb(err);
		}
		cb(null,row[0]);
	})
}
exports.update = (data,id,cb)=>{
	let query = 'update users set ? where id = ?';
	db.query(query,[data,id],(err)=>{
		if(err){
			return cb(err);
		}
		cb(null);
	})

}