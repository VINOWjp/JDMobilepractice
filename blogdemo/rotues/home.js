let express = require('express');
let home = express.Router();
let user = require('../modules/user');
let post = require('../modules/post');
    home.get('/',(req,res)=>{
      let pagesize = 2;
      let page = req.query.page||1;
      post.count((err,row)=>{
        if(!err){

           let total = row.total;
           let pages = Math.ceil(total/pagesize);
           post.find(pagesize,page,(err,rows)=>{
             console.log(err);
            if(!err){
            res.render('home/index',{data:rows,
                                     page:page,
                                     pages:pages})
            }
           })

        }
      })
     
     });
     home.get('/login',(req,res)=>{
     	res.render('home/login',{});
     })
     home.get('/register',(req,res)=>{
     	res.render('home/register',{});
     })
     //处理注册
     home.post('/register',(req,res)=>{
          //console.log(req.body);
          user.insert(req.body,(err)=>{
               if(!err){
                    res.json({
                         code:10000,
                         msg:'注册成功!'
                    })
               }
          })
     })
     // 处理登录的逻辑 
     home.post('/login',(req,res)=>{
          user.author(req.body.email,req.body.pass,(err,row)=>{
               //登陆成功 设置一个seesion
               // console.log(req.body.email);
               if(!err){
                   req.session.logininfor = row;
                   res.json({
                    code:10000,
                    msg:'登录成功'
                   }) 
               }else {
                    res.json({
                          code:10001,
                          msg:err.msg
                    })
               }
          })
          


     })
     
 module.exports = home;