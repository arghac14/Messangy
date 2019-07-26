var express=require('express')
var bodyparser=require('body-parser')

var app=express()

var {showChat} = require('./routes/index');

app.set("view engine","ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json())



app.get('/', showChat)



app.listen(3000)