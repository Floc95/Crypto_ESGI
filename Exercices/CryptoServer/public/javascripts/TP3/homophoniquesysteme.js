function HomophoniqueSysteme()
{
	var self = this;
	self.key = null;
	self.alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' ', ',', '.'];
	self.map = {};
	self.referenceMap = null;

	for (var i = 0; i < self.alpha.length; i++) {
		self.map[self.alpha[i]] = i;
	};

	self.createReference = function(refText){
		refText = self.removeDiacritics(refText);
		refText = refText.toUpperCase();

		self.referenceMap = self.getFrequenceMap(refText);
	};

	self.getFrequenceMap = function(text){
		var map = {}, length = 0;
		for (var i = 0; i < text.length; i++){
			if(!map[text[i]])
				length++;
			map[text[i]] = map[text[i]] ? map[text[i]] + 1 : 1;
		}

		for (var k in map)
			map[k] = map[k] / length;

		return map;
	};

	self.removeDiacritics = function(s) {
	    var diacritics = [
	    /[\300-\306]/g, /[\340-\346]/g, // A, a
	    /[\310-\313]/g, /[\350-\353]/g, // E, e
	    /[\314-\317]/g, /[\354-\357]/g, // I, i
	    /[\322-\330]/g, /[\362-\370]/g, // O, o
	    /[\331-\334]/g, /[\371-\374]/g,  // U, u
	    /[\321]/g, /[\361]/g, // N, n
	    /[\307]/g, /[\347]/g, // C, c
	    ];

	    var chars = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'N', 'n', 'C', 'c'];

	    for (var i = 0; i < diacritics.length; i++) {
	        s = s.replace(diacritics[i], chars[i]);
	    }

	    var charsSpec = ['-', '&', '"', '!', '?', ';', '(', ')', '’', '1', '8', '0', '…', 'œ', 'ü', '2', '3', '4', '5', '6', '7', '9', '@', '#', '{', '}', '$', '€', '\n', '\r', ':'];
		for (var i = 0; i < charsSpec.length; i++) {
	    	s = s.replace(charsSpec[i], " ");
	    };


	    return s;
	};

	self.encode = function(source){
		var result = "", used = {};

		source = self.removeDiacritics(source);
		source = source.toUpperCase();

		for (var i = 0; i < source.length; i++) {
			used[source[i]] = undefined != used[source[i]] ? used[source[i]] + 1 : 0;
			result += String.fromCharCode(self.key[source[i]][used[source[i]] % self.key[source[i]].length]);
		};

		return result;
	}

	self.decode = function(source){
		var result = "", map = {};
		for (var k in self.key)
			for (var i = 0; i < self.key[k].length; i++)
				map[self.key[k][i]] = k;
		for (var i = 0; i < source.length; i++)
			result += map[source[i].charCodeAt(0)];
		return result;
	}

	self.generateKey = function(refText){
		var keygen = {};
		var n = Math.floor((Math.random()*255) + 1);

		self.createReference(refText);

		for (var i = 0; i < self.alpha.length; i++) {
			keygen[self.alpha[i]] = [];

			var nbSubstitus = (255 * self.referenceMap[self.alpha[i]]) / 100;
			for (var j = 0; j < nbSubstitus; j++)
				keygen[self.alpha[i]].push((n++) % 255);
		};		

		self.key = keygen;
	}
}