const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/', function (req, res) {
    res.sendFile(`${__dirname}/public/index.html`);
});

io.on('connection', function (socket) {
    console.log("un utilisateur s'est connecté");

    socket.on('chat-msg', function (msg) {
        io.emit('chat-msg', msg);
    });
});


server.listen(3000, function () {
    console.log('écoute sur le port 3000')
});