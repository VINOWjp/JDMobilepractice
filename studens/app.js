 let http = require('http');
 let url = require('url');
 let fs = require('fs');
 let  path = require('path');
 let infor = require('./database/infor.json');//从模拟的数据库json文件引进来，因nodejs已经帮我们把json字符串转化成数组的形式了，因此无需在转译
      // infor = JSON.parse(infor);
 let  template = require("art-template");
      template.defaults.root = './views';
      template.defaults.extname = '.html';     
 let app = http.createServer();
     app.listen(3000,(err)=>{
     	if(!err){
     		console.log('服务器已经启动啦!');
     	}
     });
     app.on('request',(req,res)=>{
     	let {pathname} = url.parse(req.url);
     	let realpath = path.join('./public',pathname);
     	 res.render = (tpl,data)=>{
              let html = template(tpl,data);
              res.end(html);
     	 }
     	switch(pathname){
     		case '/':
     		case '/add':
                    res.render('add',{});
     		break;
               case '/create':
                    //如果路由地址是/create，处理该逻辑;
                    let {query} = url.parse(req.url,true);
                    infor.push(query);
                     fs.writeFile('./database/infor.json',JSON.stringify(infor),(err)=>{
                         if(!err){
                              //如果写入成功,那么重定向，跳转到list界面并将数据展示到list页面中；
                              res.writeHeader(302,{
                                   'Location':'/list'
                              });

                         }
                         res.end();

                     });
  
                  break; 
                  case '/delete':
               let key = url.parse(req.url,true).query.key;
                    infor.splice(key,1);
                    fs.writeFile('./database/infor.json',JSON.stringify(infor),(err)=>{
                         if(!err){
                              res.writeHeader(302,{
                                   'Location':'/list'
                              })
                         }
                         res.end();
                    })
                break;   
     		case '/list':
                    res.render('list',{list:infor});
     		break;

     		default:
     		fs.readFile(realpath,(err,data)=>{
     		  // res.write(data);
                 if(!err){
     		  res.end(data);
               }
     		})

     	}
     })