exports.getLinks = function(callback) {
	var fs = require('fs');
	var indexcontent = "";
	var tablefile = [];
	
	fs.readdir('./public/views',function(error,directoryObject){
		for(var i in directoryObject){
			var directory = directoryObject[i];
			//console.log(directoryObject[i]);
			fs.readdir('./public/views/'+ directory, function(error,fileObject){
				for(var y in fileObject){
					var link = directory.red + '/' + fileObject[y];
					//console.log(directory.red + '/' + fileObject[y].green);
					//indexcontent += '<a href="'+link+'">'+fileObject[y]+'</a></br>';
                    callback('<a href="'+link+'">'+fileObject[y]+'</a></br>');
					//console.log(indexcontent);
				}
			});
		}
		
	});

	//Stocker dans un tableau
	console.log("contenu : "+indexcontent.blue);
	//callback indexcontent;
    callback(indexcontent);
};
