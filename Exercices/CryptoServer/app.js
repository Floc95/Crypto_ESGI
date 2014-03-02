
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
        app.use(express.urlencoded()),
        app.use(express.cookieParser());
        // Session management
        app.use(express.session({
            // Private crypting key
            "secret": "some private string",
            // Internal session data storage engine, this is the default engine embedded with connect.
            // Much more can be found as external modules (Redis, Mongo, Mysql, file...). look at "npm search connect session store"
            "store":  new express.session.MemoryStore({ reapInterval: 60000 * 10 })
        }));
});

    //Affichage lors du lancement du serveur
    httpServer.listen(app.get('port'), function () {
    console.log("Crypto server listening on port %s.".blue, httpServer.address().port);
});


    /**
     *   Fonctions du serveur
     *   TO DO : normalement, il est possible de stocker ces fonctions ailleurs que dans
     *   le app.js (route) à voir si possible
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
    app.post('registration', function(request, response){
        //TO DO : vérifier que l'utilisateur n'existe pas et l'enregistrer dans un fichier (.json)
        var sessId = request.sessionID;
        var userlogin = request.body.file.user[login];
        var userpassword = request.body.file.user[password];
        //vérifier que l'utilisateur exite
        //si il existe, affecter le session id courant à l'utilisateur afin de le reconaitre, le supprimer à la déconnexion
        //Pour chaque page sécurisé, vérifier si le session id est attribué à un utilisateur, sinon, recalé l'utilisateur courant

    });
    app.post('login', function(request, response){
        //TO DO:  vérfifier que l'utilisateur existe et que le mot de passe est correct, si oui ouvrir une session
        var userlogin = request.body.file.user[login];
        var userpassword = request.body.file.user[password];

    });

    //Fonction index permettant d'afficher tous les éléments présents dans le fichier view
    app.get('/autoindex', function(request, response){
        var links = "<html><head></head><body>";

        var directory = fs.readdirSync("./public/views");

        for (i = 0; i < directory.length; i++) {
            var filenames = fs.readdirSync("./public/views/"+directory[i]);
            links +='<h3>'+directory[i]+'</h3></br>';
            for (y = 0; y < filenames.length; y++)
                links += '<a href="./views/'+directory[i]+'/'+filenames[y]+'">'+filenames[y]+'</a></br>';
        }
        links+='</body></html>'
        response.end(links);
    });
    app.get('/session', function(request, response){
        console.log('Entrée dans la fonction get session'.green);
        var index = (request.session.index || 0) + 1;
        var sessId = request.sessionID;

        response.end('<html><body><ul>' +
            '<li>' + index + '</li>'+
            '<li>' + sessId + '</li>'+
            '</ul></body></html>');
        //Le session id permet de différencier un utilisateur d'un autre, d'un navigateur à l'autre
    });

    app.get('/name/:name', function(request, response){
        request.session.name = request.params.name;
        response.send("<a href='/name'>GO</a>");
    });

    app.get('/user', function(request, response){
        console.log('Entrée : get user'.green)
        var User = require('./server/user').User;
        console.log(User.red);

        var currentUser = new User();
        console.log(currentUser.red);
        currentUser.createUser('marine','1234','test',request.sessionID);
        console.log('Création de l\'utilsateur : '+currentUser);
        response.end(currentUser.printUserJSON());


    });
    //Attention ! Bien spécifier dans l'utilisation des fonctions Sync (sinon asynchrone par défaut).
