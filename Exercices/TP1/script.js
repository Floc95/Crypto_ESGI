
var clair = "coucou";
var key = "QSDFGHJKLMPOIUYTREZAWXCVBN098";
var crypt = "";


var encode = function(){
	//Entre a et z = met un espace ;
	//
	var cryptcontent = "";
	for (var i = 0 ; i<clair.length ; i++) {
		cryptcontent += clair[i].charCodeAt(0)*Math.PI+";";
	}
	return cryptcontent;
};

var decode = function(){
	var clearcontent = "";
	var content = crypt.split(";");
	for (var i = 0 ; i<content.length ; i++) {
		clearcontent += String.fromCharCode(content[i]*(Math.pow(Math.PI, -1)));
	}
	return clearcontent;
};

var encode = function(fileSrc, fileKey){

	cryptcontent = "";
	for (var i = 0 ; i<fileSrc.length ; i++) {
		var ascii = clair[i].charCodeAt(0);
		if (ascii-65> 0 && ascii-65<27)
			cryptcontent += key[(clair[i].charCodeAt(0)-65)];
		if (ascii-97>0 && ascii-97<27)
			cryptcontent += key[(clair[i].charCodeAt(0)-97)];
		if (clair[i] == ' ')
			cryptcontent += key[26];
		if (clair[i] == ',')
			cryptcontent += key[27];
		if (clair[i] == '.')
			cryptcontent += key[28];
	}
	return cryptcontent;
}

var decode = function(fileSrc, fileKey){
 var clearcontentbis = "";
 for (var i = 0; i < fileSrc.length; i++){
 	var currentascii = fileSrc[i];
 	for (var y = 0; y <  fileKey.length; y++) {
 		 if (fileKey[y] == currentascii)
 		 	clearcontentbis +=  String.fromCharCode(y + 65);
 	};

 };
 return clearcontentbis;

}

var generateKey = function(){

};
 var run = function(){
 	crypt = encode(clair,key);
 	document.getElementById('result').innerHTML = crypt;
 	var decoderesult = decode(crypt, key);
 	document.getElementById('resultbis').innerHTML = decoderesult	;

 };

