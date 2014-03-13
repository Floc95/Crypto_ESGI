
function User(){

    var self = this;
    self.login = '';
    self.password = '';
    self.usertype = '';
    self.sid = ''; //sessionid
    self.nom = '';
    self.prenom = '';
    self.email = '';
    self.pays = '';


    //Donne le libellé du type d'utilisateur
    self.getUserType = function(){
        if (self.usertype === "0")
            return "Autorité d'enregistrement";
        else if (self.usertype === "1")
            return "Autorité de validation";
        else 
            return "Simple utilisateur"
    };

    //Cherche le login de l'utilisateur dans le fichier et définit ses attributs
    self.setUserByLogin = function(_login){

        var fs = require('fs');
        var file = "./server/data/users.json";

        var currentcontent = fs.readFileSync(file,'utf8');
        var r  = fs.readFile(file);
        var data = JSON.parse(currentcontent);

        for(var y = 0; y < data.users.length; y++)
            if (data.users[y].login === _login){
                self.setUser(data.users[y].login, data.users[y].password, data.users[y].type, data.users[y].sid);
                return true;      
            }
        
        console.log('Erreur : Aucun utilisateur trouvé'.red);
        return false;

    };

    //Retourne le code html du menu d'administration en fonction du type d'utilisateur
    self.getTypeMenu = function(){

        if (self.usertype === "0")
            return 'enregistrement';
        else if (self.usertype === "1")
            return 'validation';
        else
            return 'mycertificate';

    };

     self.getTypeMenuLibelle = function(){

        if (self.usertype === "0")
            return 'Gérer les enregistrements';
        else if (self.usertype === "1")
            return 'Gérer les validations';
        else
            return 'Mon certificat';

    };

    //Cherche le sid de l'utilisateur dans le fichier et défini les attributs
    self.setUserBySid = function(_sid){

        var fs = require('fs');
        var file = "./server/data/users.json";

        var currentcontent = fs.readFileSync(file,'utf8');
        var r  = fs.readFile(file);
        var data = JSON.parse(currentcontent);

        for(var y = 0; y < data.users.length; y++)
            if (data.users[y].sid === _sid){
                self.setUser(data.users[y].login, data.users[y].password, data.users[y].type, data.users[y].sid);
                return true;      
            }
        
        console.log('Erreur : Aucun utilisateur trouvé'.red);
        return false;

    };

    //Déinit les attributs de l'utilisateur
    self.setUser = function(login, password, usertype, sid){
        self.login = login;
        self.password = password;
        self.usertype = usertype;
        self.sid = sid;
    };


    self.printUserJSON = function(){
        return JSON.stringify(self);
    }

    //Création d'un utilisateur
    self.createUser = function(user, password, usertype , sessionID){
        self.login = user;
        self.password = password;
        self.usertype = usertype;
        self.sid = sessionID;
        //Ecrire dans un fichier
        self.addUser();
    };

    self.createUser = function(user, password, usertype , sessionID, nom, prenom, email, pays){
        self.login = user;
        self.password = password;
        self.usertype = usertype;
        self.sid = sessionID;
        self.nom = nom;
        self.prenom = prenom;
        self.email = email;
        self.pays = pays;
        //Ecrire dans un fichier
        self.addUser();
    };

    //Ajoute un utilisateur dans le fichier user.json
    self.addUser = function(){
        var fs = require('fs');
        var file = "./server/data/users.json";

        var currentcontent = fs.readFileSync(file,'utf8');
        var r  = fs.readFile(file); //Obliger de faire fonctionner les 2 pour du json (???)
        var data = JSON.parse(currentcontent);

        data.users[data.users.length] = {
            "login" : self.login,
            "password" : self.password,
            "type" : self.usertype,
            "sid" : self.sid,
            "nom" : self.nom,
            "prenom" : self.prenom,
            "email" : self.email,
            "pays" : self.pays
        }

        fs.writeFileSync(file, JSON.stringify(data) , "UTF-8");
        //fs.close();
    };

    //Retourn vrais si aucun utilisateur possédant le même login n'est trouvé dans le fichier
    self.userExist = function(_user){
        var fs = require('fs');
        var file = "./server/data/users.json";

        var currentcontent = fs.readFileSync(file,'utf8');
        var r  = fs.readFile(file);
        var data = JSON.parse(currentcontent);

        for(var y = 0; y < data.users.length; y++)
            if (data.users[y].login === _user)
                return false;   //Retourne false si un utilisateur du même nom est trouvé
        return true;

        //fs.close();
    };

    //Vérifie si un utilisateur est connecté sur la session courante
    self.userConnect = function(_sessionID){
        var fs = require('fs');
        var file = "./server/data/users.json";

        var currentcontent = fs.readFileSync(file,'utf8');
        var r  = fs.readFile(file);
        var data = JSON.parse(currentcontent);

        for(var y = 0; y < data.users.length; y++)
            if (data.users[y].sid === _sessionID)
                return true;   
        return false;

    };

    //Vérifie le login et le mot de passe et attribut la session id a l'utilisateur si ses identifiants sont bons
    self.userlog = function(_login, _password,_sid){
        var fs = require('fs');
        var file = "./server/data/users.json";

        var currentcontent = fs.readFileSync(file,'utf8');
        var r  = fs.readFile(file);
        var data = JSON.parse(currentcontent);

        for(var y = 0; y < data.users.length; y++)
            if (data.users[y].login === _login && data.users[y].password === _password){
                data.users[y].sid = _sid;
                fs.writeFileSync(file, JSON.stringify(data) , "UTF-8");
                self.setUser(_login, _password, data.users[y].type, _sid);
                return true;
                
            }
        return false;

        //fs.close();

    };

    //Déconnexion de l'utilisateur
    self.logout = function(){
        var fs = require('fs');
        var file = "./server/data/users.json";

        var currentcontent = fs.readFileSync(file,'utf8');
        var r  = fs.readFile(file);
        var data = JSON.parse(currentcontent);

        for(var y = 0; y < data.users.length; y++)
            if (data.users[y].sid === self.sid){
                data.users[y].sid = '';
                fs.writeFileSync(file, JSON.stringify(data) , "UTF-8");
                return true;
            }   
        
        return false;
        //fs.close();
    };
};

exports.User = User;



