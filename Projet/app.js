
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

app.configure(function () {
    app.set('port', 3000);
    app.use(express.static(__dirname + '/public'));

    app.engine('ejs', require('ejs').renderFile);
    app.set('view engine', 'ejs');
    app.set('views',__dirname + '/public/views');
    app.set('view options', { layout:false, root: __dirname + '/public/views' });

    app.use(express.urlencoded()),
    app.use(express.cookieParser());
    app.use(express.session({
        "secret": "some private string",
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
        response.render('administration', { username: currentUser.login, usertype: currentUser.getUserType(), 
            typeaction: currentUser.getTypeMenu(), typeid: currentUser.getTypeMenu(), typelibelle: currentUser.getTypeMenuLibelle() });
    }
    else
        response.render('login', { message: '', errormessage: '' });
});

//Fonction permettant d'afficher le template d'enregistrement d'un nouvel utilisateur
app.get('/signin', function(request, response){

    var User = require('./server/user').User;
    var currentUser = new User();
    if (currentUser.userConnect(request.sessionID)){
        currentUser.setUserBySid(request.sessionID);
        response.render('administration', { username: currentUser.login, usertype: currentUser.getUserType(), 
            typeaction: currentUser.getTypeMenu(), typeid: currentUser.getTypeMenu(), typelibelle: currentUser.getTypeMenuLibelle() });
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
    var User = require('./server/user').User;
    var currentUser = new User();
    currentUser.setUserBySid(request.sessionID);
    if (currentUser.logout())
        console.log('Déconnexion résussie !'.green);
    else
        console.log('Erreur lors de la déconnexion.'.red)

    response.redirect('/');
});

app.post('/signin', function(request, response){
    //TO DO : vérifier que l'utilisateur n'existe pas et l'enregistrer dans un fichier (.json)
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
    var userlogin = request.body.user.login;
    var userpassword = request.body.user.password;

    var User = require('./server/user').User;
    var currentUser = new User();
    if (currentUser.userlog(userlogin, userpassword, request.sessionID)){
        console.log("Connexion : "+ currentUser.login.green)
         response.render('administration', {
            username: currentUser.login, usertype: currentUser.getUserType(), codetype: currentUser.getTypeMenu(),
            typeaction: currentUser.getTypeMenu(), typeid: currentUser.getTypeMenu(), typelibelle: currentUser.getTypeMenuLibelle() });
     }
    else
        response.render('login', {
            message: '',
            errormessage: 'Login ou mot de passe incorrect !'
        });

});


app.post('/administration', function(request, response){
    console.log('administration'.red);
    var User = require('./server/user').User;
    var currentUser = new User();
    if (currentUser.userConnect(request.sessionID)){
        currentUser.setUserBySid(request.sessionID);
        response.render('administration', { username: currentUser.login, usertype: currentUser.getUserType(), 
            typeaction: currentUser.getTypeMenu(), typeid: currentUser.getTypeMenu(), typelibelle: currentUser.getTypeMenuLibelle() });
    }
    else
        response.render('login', { message: '', errormessage: 'Erreur de connexion' });
});

app.post('/enregistrement', function(request, response){
    console.log('enregistrement'.red);
    var User = require('./server/user').User;
    var currentUser = new User();
    if (currentUser.userConnect(request.sessionID)){
        currentUser.setUserBySid(request.sessionID);
        response.render('enregistrement', { username: currentUser.login, usertype: currentUser.getUserType(), 
            typeaction: currentUser.getTypeMenu(), typeid: currentUser.getTypeMenu(), typelibelle: currentUser.getTypeMenuLibelle() });
    }
    else
        response.render('login', { message: '', errormessage: 'Erreur de connexion' });
});

app.post('/validation', function(request, response){
   console.log('validation'.red);
   console.log('enregistrement'.red);
    var User = require('./server/user').User;
    var currentUser = new User();
    if (currentUser.userConnect(request.sessionID)){
        currentUser.setUserBySid(request.sessionID);
        response.render('validation', { username: currentUser.login, usertype: currentUser.getUserType(), 
            typeaction: currentUser.getTypeMenu(), typeid: currentUser.getTypeMenu(), typelibelle: currentUser.getTypeMenuLibelle() });
    }
    else
        response.render('login', { message: '', errormessage: 'Erreur de connexion' });
});
