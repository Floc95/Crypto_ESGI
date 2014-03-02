
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

        console.log('Content: '+currentcontent);
        var data = JSON.parse(currentcontent);
        console.log(data.users[1].password);

        for(var i = 0; i < data.users.length; i++) {
            var obj = data.users[i];

            console.log('Data : '+obj.user);
        }

        //var newdata = JSON.stringify(self);
        //var datatoset = newdata.split('"').join("");
        //console.log("Data to set : "+newdata.split('').join(""));
        //data.users[i] = "["+newdata+"]".split('\\').join("");
        data.users[i] = {
            "login" : self.login,
            "password" : self.password,
            "type" : self.type,
            "sid" : self.sid
        }

        for(var y = 0; y < data.users.length; y++) {
            var obj = data.users[y];

            console.log('Data 2 : '+obj.user);
        }

        console.log("Final data : "+JSON.stringify(data));

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



