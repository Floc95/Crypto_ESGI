function AttackSysteme(){
	var self = this;

	self.referenceMap = null;
	self.cryptoSys = cryptoSys;

	self.createReference = function(){
		var refText = "";

		refText = self.removeDiacritics(refText);
		refText = refText.toUpperCase();

		self.referenceMap = self.getFrequenceMap(refText);
	};

	self.getFrequenceMap = function(text){
		var map = [];
		for (var i = 0; i < text.length; i++) {
			map[text[i]] = { key: text[i], value:(map[text[i]] ? map[text[i]] + 1 : 1) };
		};
		return map;
	};

	self.getKeyOf = function(map1, map2, caract){
		var val = map1[caract].value;
		for (var kv in map2)
			if (kv.value == val)
				return kv.key;
		return null;
	};

	self.attack = function(content){
		// Attaque par analyse de fréquence des symboles
		var frequenceMap = self.getFrequenceMap(content);
		var resContent = "";

		for (var i = 0; i < content.length; i++) {
			resContent += self.getKeyOf(frequenceMap, self.referenceMap, content[i]);
		};

		return resContent;
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

	    return s;
	}

	self.createReference();
}