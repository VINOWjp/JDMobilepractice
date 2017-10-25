// 第一步http模块 搭建服务器
let http = require('http');
let fs = require('fs');
let path = require('path');
let mime =require('mime');
let server = http.createServer();
server.listen(3000,(err)=>{
	if(!err){
		console.log('服务器正在监听3000端口!')
	}
})
server.on('request',(req,res)=>{
    	//第一步判断用户请求的地址，来判断他请求的是什么文件
     console.log(req.url);
    	if(req.url=='/'){
    		//如果请求地址是/ 那么说明该用户请求的是我们网站的主页';
    		//那么就把我们的网站的首页响应给用户
    	   //因为我们无法把整个html文件直接相应给用户所以需要下利用系统模块fs的readFile方法把文件读取出一下，然后在响应给用户;
    	   //  先设置响应头
    	   res.writeHeader(200,{
    	   	'Content-Type':'text/html;charset=UTF-8'
    	   });
    	   fs.readFile('./index.html',(err,data)=>{
    	   	if(!err){
    	   	 	//读取完之后把读取的结果通过参数的形式传递给回调函数;
    	   	 	res.write(data);
    	   	 	res.end();
    	   	 }
    	   	}) 

    	}else {
                //因为我们响应给用户的html文件中海油href，src等其他请求的方式，所以仍然要根据请求地址来判断他的请求时啥子哦
               //这里需要注意，我们的请求头中的url给的是绝对路径，因此我们需要先通过系统模块path来处理成我们想要的相对路径；
               let realpath = path.join('./',req.url);
               //然后通过第三方模块mime来吧我们的地址处理成响应头;
               res.writeHeader(200,{
                'Content-Type':mime.getType(realpath)
                //console.log(mime.getType(realpath));
               });
               fs.readFile(realpath,(err,data)=>{
                if(!err){
                    res.write(data);
                    res.end();
                }
               })

             }

    })