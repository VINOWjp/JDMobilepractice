let admin = require('express').Router();
let post = require('../modules/post');
let  user = require('../modules/user');
let  multer = require('multer');
 let  storage =  multer.diskStorage({
 	destination:function(req,file,cb){
 		cb(null,'public/admin/uploads/avatar');
 	},
 	 filename: function (req, file, cb) {
        let extname = file.originalname.slice(file.originalname.lastIndexOf('.'));
        cb(null, file.fieldname + '-' + Date.now() + extname);
    }
 })
// let upload = multer({dest: 'public/admin/uploads/avatar'});
let upload = multer({storage:storage});
admin.get('/',(req,res)=>{
	res.render('admin/index',{});
})
admin.get('/add',(req,res)=>{
	res.render('admin/blog_add',{kind:"/admin/add"});
})
admin.post('/add',(req,res)=>{

	  req.body.uid = req.session.logininfor.id;
	  // console.log(req.body);
	  post.insert(req.body,(err)=>{
	  	if(!err){
	  		res.json({
	  			code:10000,
	  			msg:'添加成功'
	  		})
	  	}
	  })

})
admin.get('/list',(req,res)=>{
	  let id = req.session.logininfor.id;
	  post.show((err,row)=>{
	  	if(err){
	  		res.send('数据库错误啦')
	  	}
	  	   if(!err){
	  	   	res.render('admin/blog_list',{list:row});
	  	   }
	  })
	
})
admin.get('/delete',(req,res)=>{
	 let id = req.query.id;
	 post.delete(id,(err)=>{
	 	if(!err){
	 		res.json({
	 			code:10000,
	 			msg:'删除成功'
	 		})
	 	}
	 })

})
admin.get('/settings',(req,res)=>{
	 let id = req.session.logininfor.id;
	 user.show(id,(err,row)=>{
	 	if(!err){
        res.render('admin/settings',{list:row});
	 	}
	 })
	
})
admin.post('/update',(req,res)=>{
	let id = req.session.logininfor.id;
	// console.log(req.body);
	let data = req.body;
	user.update(data,id,(err)=>{

		// console.log(err);
		if(!err){
			res.json({
				code:10000,
				msg:'修改成功!'
			})
		}
	})

})
admin.get('/logout',(req,res)=>{
	req.session.logininfor = null;
	res.redirect('/login');
})
admin.get('/edit',(req,res)=>{
	let id = req.query.id;
	
	post.find(id,(err,row)=>{
		
		if(!err){
			res.render('admin/blog_add',{data:row,
			                              kind:"/admin/modify"})
		}
	})
})
admin.post('/modify',(req,res)=>{
	let id  = req.body.id;
	delete req.body.id;
     let data = req.body;
     post.modify(data,id,(err)=>{
     	if(!err){
     		res.json({
     			code:10000,
     			msg:'修改成功'
     		})
     	}
     })

})
admin.post('/upfile',upload.single('avatar'),(req,res)=>{
	//console.log(req.file);
	
	res.json({
		code:10000,
		msg:'上传成功',
		path:req.file.path
	})

})
  module.exports = admin;