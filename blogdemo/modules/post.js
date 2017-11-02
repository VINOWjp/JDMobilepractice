let db = require('./db');
exports.insert =(data,cb)=>{
	let query = 'insert into posts set ?';
	db.query(query,data,(err)=>{
		if(err){
			return cb(err);
		}
		cb(null);
	})

}
exports.show = (id,cb)=>{

	let query = 'select * from posts where uid = ?';
	db.query(query,id,(err,row)=>{
         if(err){
         return	 cb(err);
         }
         cb(null,row);
 	})

}
exports.find = (...arg)=>{
	let pagesize,page,cb,query,offset;
	if(arg.length==1 && typeof arg[0] ==='function'){
		cb = arg[0];
	  query = 'select * from posts left join users on posts.uid = users.id';
	 db.query(query,(err,row)=>{
	 	if(err){
	 	   return	cb(err);
	 	}
	 	cb(null,row[0]);

	 })
	}else {
		pagesize = arg[0];
		page = arg[1];
		cb = arg[2];
		offset = (page-1)*pagesize;
		query ='select p.id as id,p.uid,p.title,p.brief,p.content,p.status,p.time,u.id as userid,u.name,u.pass,u.email,u.avatar,u.gender,u.phone,u.company,u.homepage,u.alt from posts p left join users u on p.uid = u.id limit ?, ?';
        db.query(query,[offset,pagesize],(err,row)=>{
        	if(err){
        		return cb(err);
        	}
           cb(null,row)	

        })
		
	}
}
exports.modify = (data,id,cb)=>{
	let query = 'update posts set ? where id = ?';
	db.query(query,[data,id],(err)=>{
		if(err){
			return cb(err)
		}
		cb(null);
	})
}
exports.delete= (id,cb)=>{
	let query = 'delete from posts where id = ?';
	db.query(query,id,(err)=>{
		if(err){
			return cb(err);
		}
		cb(null)
	})
}
exports.count = (cb,row)=>{
	let query =  'select count(*) as total from posts';
	db.query(query,(err,row)=>{
		if(err){
			return cb(err);
		}
		cb(null,row[0]);
	})
}