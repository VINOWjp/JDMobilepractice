let http = require('http');
let url = require('url');
let server = http.createServer();
    server.listen(3000);
    //有人来访问就会触犯request事件
    server.on('request',(req,res)=>{
    	console.log('有人来访问啦！');
    	console.log(url.parse(req.url,true));
    	//console.log(req.url);//nodejs增加了url中的方法对地址传过来的参数进行解析
    	res.writeHeader(
    		'200',
    		{'Content-Type':'text/html;charset=UTF-8'});
    	res.write('访问我干啥');
    	res.end();
    })