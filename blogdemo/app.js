let express = require('express');
let app = express();
let admin = require('./rotues/admin');
let home = require('./rotues/home');
let bodyParser = require('body-parser');
let session = require('express-session');
app.listen(3000,(err)=>{
   if(!err){
      console.log('服务器正在监听3000端口');
  }
});
app.use(bodyParser.urlencoded({extended:false}));
app.set('views','./views');
app.set('view engine','xtpl');
app.use(session({
    secret: 'fad',
    resave: false,
    saveUninitialized: false
}));
app.use('/admin',(req,res,next)=>{
    if(!req.session.logininfor){
        return res.redirect('/login');
    }
    next();
})
app.use(express.static('./public'));
app.use('/public',express.static('./public'));
app.use('/admin',admin);
app.use('/',home);