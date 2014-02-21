
/*
 * GET users listing.
 */
 
var fs = require('fs');

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.createFile = function(nameFile){
	//Créer le fichier dans le folder file
};

exports.readFile = function(file){
	var contentFile = "";
	//Lit le fichier
	return contentFile;
};

exports.modifyFile = function(file, content){
	//Remplace de contenu du fichier par le contenu passé en parametre
};

exports.deleteFile = function(file){
	//Supprimer le fichier
};

exports.getFileFirectory = function(directory){
	var mapFile = {};
	//Parcourir tous les fichiers dans un dossier
	return mapFile; //Retourner liste de fichier
};
