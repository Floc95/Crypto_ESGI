
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
    var User = require('./server/user').User;
    var currentUser = new User();
    if (currentUser.userConnect(request.sessionID)){
        currentUser.setUserBySid(request.sessionID);
        response.render('administration', { username: currentUser.login, usertype: currentUser.getUserType() });
    }
    else
        response.render('login', { message: '', errormessage: '' });
});

app.get('/signin', function(request, response){

    var User = require('./server/user').User;
    var currentUser = new User();
    if (currentUser.userConnect(request.sessionID)){
        currentUser.setUserBySid(request.sessionID);
        response.render('administration', { username: currentUser.login, usertype: currentUser.getUserType() });
    }
    else
        response.render('signin', { errormessage: ''});
});

//Pour cette page, vérifier si la personne est logé, sinon la rediriger vers la page login
app.get('/administration', function(request, response){
    response.redirect('/');
});


/**
 *   Fonctions du serveur
 *   POST
 */

app.post('/logout', function(request, response){
    console.log('Logout'.green);

    var User = require('./server/user').User;
    var currentUser = new User();

    console.log(request.body.user);
    currentUser.setUserBySid(request.sessionID);
    if (currentUser.logout())
        console.log('Déconnexion résussie !'.green);
    else
        console.log('Erreur lors de la déconnexion.'.red)

    response.redirect('/');
});

app.post('/signin', function(request, response){
    //TO DO : vérifier que l'utilisateur n'existe pas et l'enregistrer dans un fichier (.json)
    console.log('Entrée : post registration');
    var userlogin = request.body.user.login;
    var userpassword = request.body.user.password;
    var usertype = request.body.user.type;

    var User = require('./server/user').User;
    var currentUser = new User();
    if (currentUser.userExist(userlogin)){
        currentUser.createUser(userlogin,userpassword,usertype,request.sessionID);
        response.render('login', {
            message: "Félicitation ! l'utilisateur a bien été créé !",
            errormessage: ''
        });
    }
    else{
        console.log('Un utilisateur possede deje le meme login'.red);
        response.render('signin', {
            errormessage: 'Veuillez saisir un autre login'
        });
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
        response.render('login', {
            message: '',
            errormessage: 'Login ou mot de passe incorrect !'
        });

});
