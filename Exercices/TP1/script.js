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

var encode = function(source, key){
	var map = getValueMap(key);

	return convertWithMap(source, map);
}

var decode = function(source, key){
	var map = getKeyMap(key);

	return convertWithMap(source, map);
}

var generateKey = function(){
	var keygen = [];
	for (var i = 0; i<27; i++){
		keygen.push(String.fromCharCode(65+i));
	}
	var newKeygen = [];
	var temp = "";
	i--;
    while ( --i ) {
    	/*Magic, do not touch !*/
        var j = Math.floor( Math.random() * ( i + 1 ) );
        temp = keygen[i];
        newKeygen[i] = keygen[j];
        keygen[j] = temp;
    }
    return newKeygen;

}

var keygen = generateKey();

var runEncode = function(){
	var clair = document.getElementById('clair').value;
	var crypted = encode(clair, keygen);
	document.getElementById('crypted').value = crypted;
};

var runDecode = function(){
	var crypted = document.getElementById('crypted').value;
	var clair = decode(crypted, keygen);
	document.getElementById('reclair').value = clair;
};