
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

    };

    self.userConnect = function(_sessionID){
        console.log('Entrée : userConnect');

    };

    self.getAllUsers = function(){
        console.log('Entrée : getAllUsers');



    };

    self.getUserInformations = function(){
        console.log('Entrée : getUserInformations');

    };


    self.createDataUser = function(name){
        console.log('Entree dans createDataUser'.green);
        var fs = require("fs");
        fs.openSync('./server/data/'+ name+'.txt', 'w');

    };
};

exports.User = User;



