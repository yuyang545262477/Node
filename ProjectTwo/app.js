//搭建服务器.
var express = require('express');//添加依赖
var app = express();//express 实例
var port = process.env.PORT || 3000;//端口

app.use(express.static(__dirname + '/static'));
app.use(function (req, res) {
    res.sendfile('./static/index.html');
});
//设置socket.io
var io = require('socket.io').listen(app.listen(port));
io.sockets.on('connection', function (socket) {
    socket.emit('connected');
});

console.log('ProjectTwo is on Port ' + port + '!');

