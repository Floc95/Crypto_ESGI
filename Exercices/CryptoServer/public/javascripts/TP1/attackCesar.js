function AttackCesar(cryptoSys){
	var self = this;

	self.cryptoSys = cryptoSys;
	self.referenceMap = null;
	self.key = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' ', '.', ','];
	self.keyDecale = null;
	self.words = ["LE", "LA", "LES", "DE", "DANS", "CE", "CECI", "JE", "TU", "IL", "NOUS", "VOUS", "ILS"];

	self.decal = function(key, decalage)
	{
		var keygen = [];
		for (var i = 0; i < key.length; i++) {
			var index = key.length - decalage + i;
			if (index >= key.length)
				index = index - key.length;
			keygen[i] = key[index];
		};
		return keygen;
	};

	self.attack = function(content){
		var keysDecal = [];
		for (var i = 0; i < self.key.length; i++) {
			var key = self.decal(self.key, i);
			var goodWords = 0;
			var decodeContent = self.cryptoSys.decode(content, key);

			for (var j = 0; j < self.words.length; j++) {
				var nbOccurs = decodeContent.split(self.words[j]).length - 1;

				if (nbOccurs > 0)
					goodWords += nbOccurs;
			};

			keysDecal.push({ myKey: key, nbGoodWords: goodWords});
		};

		keysDecal = keysDecal.sort(function (a, b) { 
			if (a.nbGoodWords < b.nbGoodWords)
				return 1;
			else if (a.nbGoodWords > b.nbGoodWords)
				return -1;
			return 0;
		});

		self.keyDecale = keysDecal[0].myKey;

		return self.cryptoSys.decode(content, self.keyDecale);
	};
}