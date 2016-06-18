var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('user has login');
    socket.on('chat message', function (data) {
        console.log('recive a message');
        io.emit('back message', data);
    })
});


http.listen(3000, function () {
    console.log('listen on 3000');
});