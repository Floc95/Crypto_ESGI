exports.getLinks = function() {
	var fs = require('fs');
	var indexcontent = "";
	fs.readdir("./public/views",function(error,directoryObject){
		for( var i in directoryObject){
			//Scaner les fichiers dans le dossier courant
			console.log(directoryObject[i]);
		}
	});
	return indexcontent;
};