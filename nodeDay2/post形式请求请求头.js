let http = require('http');
let querystring = require('querystring');
let  server = http.createServer();
     server.listen(3000,(err)=>{
     	console.log('服务器正在监听3000号端口');
     })
     server.on('request',(req,res)=>{
     	//post请求，传递数据是以每一段每一段的形式来传递，每次传递都会触发data事件
     	console.log('请求方式是：',req.method);
     	console.log('请求地址是:',req.url);
     	let formData = '';
     	 req.on('data',(chunk)=>{
     	 	 //传递的时候是以buffer来传递，
     	 	console.log(chunk);
     	 	formData +=chunk;

     	});
     	 req.on('end',()=>{

     	 	console.log(formData);//得到的形式是字符串的形式仍然不是我们想要的形式，所以可以利用系统模块querystring来解析成对象的形式
             console.log(querystring.parse(formData));
     	 })
     })