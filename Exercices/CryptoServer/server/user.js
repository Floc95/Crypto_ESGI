
exports.addUser = function(user){
	
	console.log('Entree dans addUser'.green);

	var fs = require("fs");
	var currentcontent = "";
	fs.writeFileSync("./server/data/users.txt", user, "UTF-8");
};
	



