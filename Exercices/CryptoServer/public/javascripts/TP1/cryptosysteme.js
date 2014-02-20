function Cryptosysteme()
{
	var self = this;

	self.getKeyMap = function(key){
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

	self.getValueMap = function(key){
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

	self.convertWithMap = function(source, map)
	{
		var result = "";

		for (var i = 0 ; i<source.length ; i++) {
			result += map[source[i]];
		}
		return result;
	}

	self.encode = function(source, key){
		var map = self.getValueMap(key);

		return self.convertWithMap(source, map);
	}

	self.decode = function(source, key){
		var map = self.getKeyMap(key);

		return self.convertWithMap(source, map);
	}

	self.generateKey = function(){
		var keygen = [];
		for (var i = 0; i<27; i++){
			keygen.push(String.fromCharCode(65+i));
		}
		keygen.push(" ");
		keygen.push(".");
		keygen.push(",");

		var newKeygen = [];
		var temp = "";
		i = keygen.length-1;
	    while ( i--) {
	        var j = Math.floor( Math.random() * ( i + 1 ) );
	        temp = keygen[i];
	        newKeygen[i] = keygen[j];
	        keygen[j] = temp;
	    }
	    return newKeygen;
	}

	self.keygen = self.generateKey();
}