
/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    fs = require('fs'),
    colors = require('colors'),
    app = express(),
    httpServer = http.createServer(app);

//configuration du serveur (port, dossier affiché)
app.configure(function () {
    app.set('port', 3000);
    app.use(express.static(__dirname + '/public'));
    app.use(express.urlencoded());
});

//Affichage lors du lancement du serveur
httpServer.listen(app.get('port'), function () {
    console.log("Crypto server listening on port %s.", httpServer.address().port);
});

app.post('/', function(request, response){
	console.log('Entree dans add.post'.green);
	var name = request.body.user.name;
	var mail = request.body.user.email;
	/*
    console.log(name.red);
    console.log(mail.green);
    response.redirect('');
    */
    var test = require('./server/user');
    test.addUser(name + " " + mail);
    response.redirect('');
});