var express= require('express')
var app=express()

var server= require('http').createServer(app)

var io= require('socket.io').listen(server)

users=[]
connections=[]

app.get('/', function(req, res){
    res.sendFile(__dirname+'/public/index.html')
    console.log("Inside app.get")
})

io.sockets.on('connection', function(socket){
    connections.push(socket)
    console.log('%s sockets connected',connections.length)

    //disconnect
    socket.on('disconnect', function(data){
        users.splice(users.indexOf(socket.username),1)
        updateUsernames()
        connections.splice(connections.indexOf(socket),1)
        console.log('Disconnected, Remaining %s sockets connected',connections.length)
    })
    //send message
    socket.on('send message', function(data){
        console.log(data);
        io.sockets.emit('new message',{msg: data, user:socket.username})
    })

    //log in

    socket.on('new user',function(data, callback){
        callback(true)
        socket.username=data;
        users.push(socket.usersname)
        updateUsernames();
    })
})

    function updateUsernames(){
        io.sockets.emit('get users', users)
    }

server.listen(process.env.PORT || 3000)
console.log("Server running...")