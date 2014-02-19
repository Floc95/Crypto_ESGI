function VigenereSysteme()
{
	var self = this;
	self.key = null;
	self.alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	self.map = {};

	for (var i = 0; i < self.alpha.length; i++) {
		self.map[self.alpha[i]] = i;
	};

	self.getDecalAlphaOf = function(charact, decalage)
	{
		var index = decalage + self.map[charact];
		if (index >= self.alpha.length)
			index = index - self.alpha.length;
		return self.alpha[index];
	};

	self.encode = function(source){
		var result = "";
		var keyIdx = 0;
		for (var i = 0; i < source.length; i++) {
			if (source[i] >= 'A' && source[i] <= 'Z') {
				if (keyIdx >= self.key.length)
					keyIdx = 0;
				result += self.getDecalAlphaOf(source[i], self.map[self.key[keyIdx]], 1);
				keyIdx++;
			}
			else
				result += source[i];
		};
		return result;
	}

	self.decode = function(source){
		var result = "";
		var keyIdx = 0;
		for (var i = 0; i < source.length; i++) {
			if (source[i] >= 'A' && source[i] <= 'Z') {
				if (keyIdx >= self.key.length)
					keyIdx = 0;
				var idx = self.map[source[i]] - self.map[self.key[keyIdx]];
				if (idx < 0)
					idx = self.alpha.length + idx;
				result += self.alpha[idx];
				keyIdx++;
			}
			else
				result += source[i];
		};
		return result;
	}

	self.generateKey = function(length){
		var keygen = new Array(length);

		for (var i = 0; i < length; i++){
			var random = Math.floor(Math.random()*26);
			keygen[i] = String.fromCharCode(65 + random);
		}

		self.key = keygen;
	}
}