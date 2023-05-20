const app = require('express')();
var serve_static = require('serve-static');
var serveur = require('http').Server(app);
app.use(serve_static(__dirname + "/public"));
console.log(__dirname + "/public");
serveur.listen(8080, function () {
    console.log('écoute sur le port 8080')
});

var io = require('socket.io').listen(serveur);

var liste = []


io.on('connection', function (socket) {
    socket.on('register', function (user) {
        console.log(user.pseudo + " à essayé de ce register");
        var flag = false;
        if (liste.length == 0) {
            socket.emit('alert', "Vous être bien enregistré" + user.pseudo + " !");
            liste.push(user);
        }
        else {
            for (n of liste) {
                if (n.pseudo == user.pseudo) {
                    socket.emit('alert', "le nom d'utilisateur" + user.pseudo + " existe déjà");
                    flag = true;
                    break;
                }
            }
            if (flag == false) {
                socket.emit('alert', "Vous être bien enregistré" + user.pseudo + " !");
                liste.push(user)
            }
        }

    });

    socket.on('login', function (user) {
        console.log(user.pseudo + " a essayé de ce login");
        var res = false;

        if (liste.length == 0) socket.emit('alert', "Desolé mais on ne vous connait pas.")
        else {
            for (n of liste) {
                if (n.pseudo == user.pseudo && n.mdp == user.mdp) {
                    socket.emit('alert-log-good', user, "Bienvenue " + user.pseudo + " !");
                    res = true;
                    break;
                }
                else if (n.pseudo == user.pseudo && n.mdp != user.mdp) {
                    socket.emit('alert', "Votre mot de passe est incorrect " + user.pseudo);
                    res = true;
                    break;
                }
            }
            if (res == false) {
                socket.emit('alert', "Desolé mais on ne vous connait pas");
            }
        }
    });

    socket.on('chat-msg', function (msg) {
        io.emit('chat-msg', msg);
    });
});

