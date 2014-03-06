
function User(){

    var self = this;
    self.login = '';
    self.password = '';
    self.usertype = '';
    self.sid = ''; //sessionid

    self.getUserType = function(){
        console.log("Type : "+self.usertype);
        if (self.usertype === "0")
            return "Autorité d'enregistrement";
        else
            return "Autorité de validation";
    };

    self.setUser = function(login, password, usertype, sid){
        self.login = login;
        self.password = password;
        self.usertype = usertype;
        self.sid = sid;
    };

    self.printUserJSON = function(){
        return JSON.stringify(self);
    }

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

    self.createUser = function(user, password, usertype , sessionID){
        console.log('Entrée : createUser');

        self.login = user;
        self.password = password;
        self.usertype = usertype;
        self.sid = sessionID;
        //Ecrire dans un fichier
        self.addUser();
    };

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

    self.userConnect = function(_sessionID){
        console.log('Entrée : userConnect');

        var fs = require('fs');
        var file = "./server/data/users.json";

        var currentcontent = fs.readFileSync(file,'utf8');
        var r  = fs.readFile(file);
        var data = JSON.parse(currentcontent);

        for(var y = 0; y < data.users.length; y++)
            if (data.users[y].sid === _sessionID)
                return false;   //Retourne false si un utilisateur possède le même id de session
        return true;

    };

    self.getAllUsers = function(){
        console.log('Entrée : getAllUsers');
    };

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

    self.unlog = function(){
        var fs = require('fs');
        var file = "./server/data/users.json";

        var currentcontent = fs.readFileSync(file,'utf8');
        var r  = fs.readFile(file);
        var data = JSON.parse(currentcontent);

        for(var y = 0; y < data.users.length; y++)
            if (data.users[y].login === self.login)
                data.users[y].sid = '';

        fs.writeFileSync(file, JSON.stringify(data) , "UTF-8");
        //fs.close();
    };
};

exports.User = User;



