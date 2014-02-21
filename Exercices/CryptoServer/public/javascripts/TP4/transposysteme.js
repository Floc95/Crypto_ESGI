function TranspoSysteme(){
	var self = this;

	self.key = null;

	self.encode = function(source){
		var spaceAdds = self.key.length - (source.length % self.key.length);
		var res = new Array(spaceAdds == 0 ? source.length : source.length + spaceAdds);

		for (var i = 0; i < spaceAdds; i++)
			source += " ";

		for (var i = 0; i < source.length; i++)
			res[(self.key.length * Math.floor(i / self.key.length)) + self.key[i % self.key.length]] = source[i];

		return res.join("");
	}

	self.decode = function(source){
		var res = new Array(source.length);

		for (var i = 0; i < source.length; i++)
			res[i] = source[(self.key.length * Math.floor(i / self.key.length)) + self.key[i % self.key.length]];

		return res.join("").trim();
	}

	self.generateKey = function(length){
		var keygen = new Array(length);

		for (var i = 0; i<length; i++)
			keygen[i] = i;

		// Permutations
		for (var i = 0; i < length; i++) {
			var rdm = Math.floor(Math.random() * (length - 1));
			var tmp = keygen[i];
			keygen[i] = keygen[rdm];
			keygen[rdm] = tmp;
		}

	    self.key = keygen;
	}
}