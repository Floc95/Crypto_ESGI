
function User(){

    var self = this;
    this.login = '';
    this.password = '';
    this.type = '';
    this.sid = ''; //sessionid

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
            "type" : self.type,
            "sid" : self.sid
        }

        fs.writeFileSync(file, JSON.stringify(data) , "UTF-8");
        //fs.close();
    };

    self.createUser = function(user, password, type , sessionID){
        console.log('Entrée : createUser');

        self.login = user;
        self.password = password;
        self.type = type;
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
            if (data.users[y].login === _login && data.users[y].password){
                data.users[y].sid = _sid;
                return true;
                fs.writeFileSync(file, JSON.stringify(data) , "UTF-8");
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



