var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var clients = [];

app.get('/',function(req, res){
    res.sendFile('index.html', {"root": __dirname});
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });

    socket.on('disconnect', function(){
        setTimeout(function(){
            io.emit('ping', '');
            console.log('send ping');
        }, 3000);
    });

    socket.on('pong', function(msg){
        console.log('user '+msg.userId+' is alive');
    });

    socket.on('login', function(userName){
        for(var index in clients){
            var user = clients[index];
            if(user.name == userName){
                user.isAlive = true;
                console.log(userName + ' is coming back');
                return;
            }
        }
        clients[clients.length] = {name: userName, isAlive: true};
        console.log(userName + ' is logged in');
    });
});

http.listen(3000, function(){
    console.log('listening on *.3000');
});