
    /**
     * Module dependencies.
     */

var express = require('express'),
    http = require('http'),
    fs = require('fs'),
    colors = require('colors'),
    app = express(),
    httpServer = http.createServer(app);


    /**
     *  Elements de configuration du serveur
     */

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


    /**
     *   Fonctions du serveur
     */

    app.post('/', function(request, response){
        console.log('Entree dans add.post'.green);
        var name = request.body.user.name;
        var mail = request.body.user.email;
        /*
        console.log(name.red);
        console.log(mail.green);
        response.redirect('');
        */
        var user = require('./server/user');
        user.addUser(name + " " + mail);
        response.redirect('');
    });


    //Fonction permettant de créer un fichier en fonction d'éléments envoyés depuis un formulaire (/createFile)
    app.post('/createFile', function(request, response){
        var fileName = request.body.file.name;
        require('./server/user').createDataUser(fileName);
        response.redirect('');
    });

    //Fonction index permettant d'afficher tous les éléments présents dans le fichier view
    app.get('/autoindex', function(request, response){
        var links = "";

        var directory = fs.readdirSync("./public/views");

        for (i = 0; i < directory.length; i++) {
            var filenames = fs.readdirSync("./public/views/"+directory[i]);
            for (y = 0; y < filenames.length; y++)
                links += '<a href="./views/'+directory[i]+'/'+filenames[y]+'">'+filenames[y]+'</a></br>';
        }

        response.end(links);
    });

    /*
       Attention ! Bien spécifier dans l'utilisation des fonctions Sync (sinon asynchrone par défaut).
     */