const app = require('express')();
const server = require('http').createServer(app);
const serve_static = require('serve-static'); 
const io = require('socket.io')(server);

app.use(serve_static(__dirname + "/../public"));

io.on('connection', function (socket) {
    console.log("un utilisateur s'est connecté");

    socket.on('chat-msg', function (msg) {
        io.emit('chat-msg', msg);
    });
});


server.listen(3000, function () {
    console.log('écoute sur le port 3000')
});