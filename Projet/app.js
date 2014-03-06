
/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    fs = require('fs'),
    colors = require('colors'),
    ejs = require('ejs'),
    app = express(),
    httpServer = http.createServer(app);


/**
 *  Elements de configuration du serveur
 */

//configuration du serveur (port, dossier affiché)
app.configure(function () {
    app.set('port', 3000);
    app.use(express.static(__dirname + '/public'));

    app.engine('ejs', require('ejs').renderFile);
    app.set('view engine', 'ejs');
    app.set('views',__dirname + '/public/views');
    app.set('view options', { layout:false, root: __dirname + '/public/views' });

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
 *   GET
 */

//Fonction index permettant de rediriger la personne si celle ci est logé ou non
app.get('/', function(request, response){
    response.render('login', {
            errormessage: ''
        });
});

app.get('/login', function(request, response){
    response.redirect('/');
});

//Pour cette page, vérifier si la personne est logé, sinon la rediriger vers la page login
app.get('/administration', function(request, response){
    response.render('administration', {
        username: "Nom Prenom",
        usertype: "Type de l'utilisateur"
    });
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
    console.log('Entrée : get user'.green);

    var User = require('./server/user').User;
    var currentUser = new User();

    response.end(currentUser.getCurrentUser(request.sessionID));


});



/**
 *   Fonctions du serveur
 *   POST
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

app.post('/registration', function(request, response){
    //TO DO : vérifier que l'utilisateur n'existe pas et l'enregistrer dans un fichier (.json)
    console.log('Entrée : post registration');
    var userlogin = request.body.user.login;
    var userpassword = request.body.user.password;
    var usertype = request.body.user.type;

    var User = require('./server/user').User;
    var currentUser = new User();
    if (currentUser.userExist(userlogin)){
        currentUser.createUser(userlogin,userpassword,usertype,request.sessionID);
        console.log('Creation de l\'utilsateur : '.green+userlogin.green);
        response.end('Le nouvel utilisateur a bien ete cree !');
    }
    else{
        console.log('Un utilisateur possede deje le meme login'.red);
        response.end('Un utilisateur possede deja le meme login');
    }

});

app.post('/login', function(request, response){
    //TO DO:  vérfifier que l'utilisateur existe et que le mot de passe est correct, si oui ouvrir une session
    console.log(request.body);

    var userlogin = request.body.user.login;
    var userpassword = request.body.user.password;

    var User = require('./server/user').User;
    var currentUser = new User();
    console.log(currentUser.login);
    if (currentUser.userlog(userlogin, userpassword, request.sessionID)){
         response.render('administration', {
            username: currentUser.login,
            usertype: currentUser.getUserType()
        });
     }
    else
        response.end('Erreur');

});


//Attention ! Bien spécifier dans l'utilisation des fonctions Sync (sinon asynchrone par défaut).
