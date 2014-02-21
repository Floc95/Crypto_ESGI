function TranspoSysteme(){
	var self = this;

	self.key = null;

	self.encode = function(source){
		var mod = self.key.length - (source.length % self.key.length);
		var res = new Array(mod == 0 ? source.length : source.length + mod);
		for (var i = 0; i < mod; i++)
			source += " ";

		for (var i = 0, j = 0; i < source.length; j++, i++)
			res[(i - (i % self.key.length)) + self.key[j % self.key.length]] = source[i];

		return res.join("");
	}

	self.decode = function(source){
		var res = new Array(source.length);

		for (var i = 0, j = 0; i < source.length; j++, i++)
			res[i] = source[(i - (i % self.key.length)) + self.key[j % self.key.length]];

		return res.join("").trim();
	}

	self.generateKey = function(length){
		var keygen = new Array(length);

		for (var i = 0; i<length; i++)
			keygen[i] = i;

		// Permutations
		for (var i = 0; i < length; i++) {
			var tmp = keygen[i];
			var j = Math.floor(Math.random() * (length - 1));
			keygen[i] = keygen[j];
			keygen[j] = tmp;
		}

	    self.key = keygen;
	}

	/*self.longToByteArray = function(long) {
	    var byteArray = [0, 0, 0, 0, 0, 0, 0, 0];

	    for ( var index = 0; index < byteArray.length; index ++ ) {
	        var byte = long & 0xff;
	        byteArray [ index ] = byte;
	        long = (long - byte) / 256 ;
	    }

	    return byteArray;
	};

	self.byteArrayToLong = function(byteArray) {
	    var value = 0;
	    for ( var i = byteArray.length - 1; i >= 0; i--) {
	        value = (value * 256) + byteArray[i];
	    }

	    return value;
	};*/
}