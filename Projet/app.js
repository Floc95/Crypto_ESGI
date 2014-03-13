
/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    fs = require('fs'),
    colors = require('colors'),
    ejs = require('ejs'),
    cp = require('child_process'),
    //openssl = require('node-openssl-p12'),
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

app.get('/ca', function(request, response){
    console.log("Entree dans la fonction de génération de certificats");
    //cp.exec('%openssl% req -passout pass:abc -subj "/C=US/ST=IL/L=Chicago/O=IBM Corporation/OU=IBM Software Group/CN=John Smith/emailAddress=smith@abc.ibm.com" -new > test.cert.csr');
    //cp.exec('echo test');
    //var createCertificate = ' req -passout pass:abc -subj "/C=US/ST=IL/L=Chicago/O=IBM Corporation/OU=IBM Software Group/CN=John Smith/emailAddress=smith@abc.ibm.com" -new > ./ssl/test.cert.csr';

    /*
        function run_cmd(cmd, args, cb, end) {
            var spawn = require('child_process').spawn,
                child = spawn(cmd, args),
                me = this;
            child.stdout.on('data', function (buffer) { cb(me, buffer) });
            child.stdout.on('end', end);
        }

        // Run C:\Windows\System32\netstat.exe -an
        var foo = new run_cmd(
            '%openssl%', [createCertificate],
            function (me, buffer) { me.stdout += buffer.toString() },
            function () { console.log(foo.stdout) }
        );
    */

    //> Fait a la création
    //Créez un fichier CSR pour l'utilisateur. Définissez le mot de passe d'origine en abc. Vous pouvez également indiquer un sujet approprié.
    var createCertificate = '%openssl% req -passout pass:'+password+' -subj "/C='+pays+'/ST=IDF/L=Paris/O=ESGI/OU=AL/CN='+prenom+' '+nom+'/emailAddress='+email+'" -new > .ssl/'+login+'.cert.csr';
    //openssl req -passout pass:abc -subj "/C=US/ST=IL/L=Chicago/O=IBM Corporation/OU=IBM Software Group/CN=John Smith/emailAddress=smith@abc.ibm.com" -new > johnsmith.cert.csr

    //> Authorité de validation
    //Créez un fichier de clés privées sans mot de passe.
    var validateCertificate = '%openssl% rsa -passin pass:'+password+' -in privkey.pem -out '+login+'.key';
    //openssl rsa -passin pass:abc -in privkey.pem -out johnsmith.key

    //> Authorité d'enregistrement
    //Créez un certificat X.509 pour le nouvel utilisateur, signez-le numériquement à l'aide de la clé privée de l'utilisateur et certifiez-le à l'aide de la clé privée CA. La ligne de commande suivante crée un certificat qui est valide pendant 365 jours.
    var signCertificate = '%openssl% x509 -req -in '+login+'.cert.csr -out '+login+'.cert -signkey '+login+'.key -CA esgicrypto.ca.cert -CAkey esgicrypto.ca.key -CAcreateserial -days 365';
    //openssl x509 -req -in johnsmith.cert.csr -out johnsmith.cert -signkey johnsmith.key -CA waipio.ca.cert -CAkey waipio.ca.key -CAcreateserial -days 365

    //Créez un fichier codé PKCS#12. Le mot de passe doit être valeur par défaut.
    var getCertificate = '%openssl% pkcs12 -passout pass:default -export -in '+login+'.cert -out '+login+'.cert.p12 -inkey '+login+'.key';
    //openssl pkcs12 -passout pass:default -export -in johnsmith.cert -out johnsmith.cert.p12 -inkey johnsmith.key

});

//Fonction index permettant de rediriger la personne si celle ci est logé ou non
app.get('/', function(request, response){
    var User = require('./server/user').User;
    var currentUser = new User();
    if (currentUser.userConnect(request.sessionID)){
        currentUser.setUserBySid(request.sessionID);
        response.render('usercertificate', { username: currentUser.login, usertype: currentUser.getUserType(), 
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
        response.render('usercertificate', { username: currentUser.login, usertype: currentUser.getUserType(), 
            typeaction: currentUser.getTypeMenu(), typeid: currentUser.getTypeMenu(), typelibelle: currentUser.getTypeMenuLibelle() });
    }
    else
        response.render('signin', { errormessage: ''});
});

//Pour cette page, vérifier si la personne est logé, sinon la rediriger vers la page login
app.get('/usercertificate', function(request, response){

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
    var usernom = request.body.user.nom;
    var userprenom = request.body.user.prenom;
    var useremail = request.body.user.email;
    var userpays = request.body.user.pays;


    var User = require('./server/user').User;
    var currentUser = new User();
    if (currentUser.userExist(userlogin)){
        currentUser.createUser(userlogin,userpassword,usertype,request.sessionID, usernom, userprenom, useremail, userpays);
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
         response.render('usercertificate', {
            username: currentUser.login, usertype: currentUser.getUserType(), codetype: currentUser.getTypeMenu(),
            typeaction: currentUser.getTypeMenu(), typeid: currentUser.getTypeMenu(), typelibelle: currentUser.getTypeMenuLibelle() });
     }
    else
        response.render('login', {
            message: '',
            errormessage: 'Login ou mot de passe incorrect !'
        });

});


app.post('/usercertificate', function(request, response){
    console.log('usercertificate'.red);
    var User = require('./server/user').User;
    var currentUser = new User();
    console.log('Entree function'.green);
    if (currentUser.userConnect(request.sessionID)){
        currentUser.setUserBySid(request.sessionID);
        console.log('Entree if'.green);
        //


        //

        response.render('usercertificate', { username: currentUser.login, usertype: currentUser.getUserType(), 
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
