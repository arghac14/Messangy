var express=require('express')
var bodyparser=require('body-parser')

var app=express()

var {showChat} = require('./routes/index');
var {signin,signup,signout,addchat}=require('./routes/data')

app.set("view engine","ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json())



app.get('/', showChat)
app.get('/signin',signin)



app.listen(3000)