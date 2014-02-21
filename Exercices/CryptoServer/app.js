
/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    fs = require('fs'),
    app = express(),
    httpServer = http.createServer(app);

app.configure(function () {
    app.set('port', 3000);
    app.use(express.static(__dirname + '/public'));
    app.use(express.urlencoded());
});

httpServer.listen(app.get('port'), function () {
    console.log("Crypto server listening on port %s.", httpServer.address().port);
});

app.post('/', function(request, response){
    console.log(request.body.user.name);
    console.log(request.body.user.email);
    response.redirect('');
});