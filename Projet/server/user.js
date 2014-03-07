
function User(){

    var self = this;
    self.login = '';
    self.password = '';
    self.usertype = '';
    self.sid = ''; //sessionid


    //Donne le libellé du type d'utilisateur
    self.getUserType = function(){
        console.log("Type : "+self.usertype);
        if (self.usertype === "0")
            return "Autorité d'enregistrement";
        else
            return "Autorité de validation";
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
    console.log('Entrée : createUser');

    self.login = user;
    self.password = password;
    self.usertype = usertype;
    self.sid = sessionID;
    //Ecrire dans un fichier
    self.addUser();
    };

    //Ajoute un utilisateur dans le fichier user.json
    self.addUser = function(){
        console.log('Entree dans addUser'.green);

        var fs = require('fs');
        var file = "./server/data/users.json";

        var currentcontent = fs.readFileSync(file,'utf8');
        var r  = fs.readFile(file); //Obliger de faire fonctionner les 2 pour du json (???)
        var data = JSON.parse(currentcontent);

        data.users[data.users.length] = {
            "login" : self.login,
            "password" : self.password,
            "type" : self.usertype,
            "sid" : self.sid
        }

        fs.writeFileSync(file, JSON.stringify(data) , "UTF-8");
        //fs.close();
    };

    //Retourn vrais si aucun utilisateur possédant le même login n'est trouvé dans le fichier
    self.userExist = function(_user){
        console.log('Entrée : userExist');

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
        console.log('Entrée : userConnect');

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

    //Retourne l'user courante : Pas utilisé (normalement)
    self.getCurrentUser = function(_sid){
        console.log('Entrée : getCurrentUser'.green);
        var fs = require('fs');
        var file = "./server/data/users.json";

        var currentcontent = fs.readFileSync(file,'utf8');
        var r  = fs.readFile(file);
        var data = JSON.parse(currentcontent);

        for(var y = 0; y < data.users.length; y++)
            if (data.users[y].sid === _sid)
                return '<html><body> Nom : '+ data.users[y].login + '<br>' + 'Type : ' + data.users[y].type + '</body></html>';
        return "Aucun utilisateur trouve :(";

        //fs.close();
    };


    //Vérifie le login et le mot de passe et attribut la session id a l'utilisateur si ses identifiants sont bons
    self.userlog = function(_login, _password,_sid){
        console.log('Entree : userlog');
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



