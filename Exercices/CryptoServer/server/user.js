
exports.addUser = function(user){
	
	console.log('Entree dans addUser'.green);

	var fs = require("fs");
	var file = "./server/data/users.txt";
	var currentcontent = fs.readFileSync(file,'utf8');
	fs.writeFileSync(file, currentcontent + "\r\n" + user, "UTF-8");
};

exports.createDataUser = function(name){
	console.log('Entree dans createDataUser'.green);
	var fs = require("fs");
	fs.openSync('./server/data/'+ name+'.txt', 'w');

};



