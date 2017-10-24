let  fs = require('fs');
  fs.mkdir('test',(err) => {
  	if(!err){
  		console.log('创建目录成功!');
  	}
  });


  fs.writeFile('./test/test.html','<h1>hello world!</h1>',(err) => {
  	if(!err){
  		console.log('创建文件成功！') ;
  	}
  })