
var clair = "COUCOU";
var key = "QSDFGHJKLMPOIUYTREZAWXCVBN098";
var crypt = "";

var getKeyMap = function(key){
	var map = [];
	for (var i = 0; i < key.length; i++) {
		if (i < 26)
			map[key[i]] = String.fromCharCode(i + 65);
		else if (i == 26)
			map[key[i]] = '.';
		else if (i == 27)
			map[key[i]] = ' ';
		else if (i == 28)
			map[key[i]] = ',';
	};
	return map;
};

var getValueMap = function(key){
	var map = [];
	for (var i = 0; i < key.length; i++) {
		if (i < 26)
			map[String.fromCharCode(i + 65)] = key[i];
		else if (i == 26)
			map['.'] = key[i];
		else if (i == 27)
			map[' '] = key[i];
		else if (i == 28)
			map[','] = key[i];
	};
	return map;
};

var convertWithMap = function(source, map)
{
	var result = "";

	for (var i = 0 ; i<source.length ; i++) {
		result += map[source[i]];
	}
	return result;
}

var encode = function(fileSrc, fileKey){

	var key = fileKey; // Lire le contenu du fichier
	var source = fileSrc; // Lire le contenu du fichier
	var map = getValueMap(key);

	return convertWithMap(source, map);
}

var decode = function(fileSrc, fileKey){

	var key = fileKey; // Lire le contenu du fichier
	var source = fileSrc; // Lire le contenu du fichier
	var map = getKeyMap(key);

	return convertWithMap(source, map);
}

var generateKey = function(){

};
 var run = function(){
 	crypt = encode(clair,key);
 	document.getElementById('result').innerHTML = crypt;
 	var decoderesult = decode(crypt, key);
 	document.getElementById('resultbis').innerHTML = decoderesult	;

 };

