function AttackVigenere(){

	var self = this;

	self.key = "";
	self.textdecode = "";
	self.alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	self.map = {};

	for (var i = 0; i < self.alpha.length; i++)
		self.map[self.alpha[i]] = i;

	self.attack = function(source){
		var sequencemap = {}, lengthkey = 0;
		self.textdecode = "";
		self.key = "";
	 	sequencemap = self.getSequence(source);
	 	lengthkey = self.getLengthKey(sequencemap);
	 	self.getKey(source, lengthkey);
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

	    for (var i = 0; i < diacritics.length; i++)
	        s = s.replace(diacritics[i], chars[i]);

	    var charsSpec = ['-', '&', '"', '!', '?', ';', '(', ')', '’', '1', '8', '0', '…', 'œ', 'ü', '2', '3', '4', '5', '6', '7', '9', '@', '#', '{', '}', '$', '€', '\n', '\r', ':'];
		for (var i = 0; i < charsSpec.length; i++)
	    	s = s.replace(charsSpec[i], " ");

	    return s;
	};

	self.getFrequenceMap = function(text){
		var map = {}, sorted = [], length = 0;
		for (var i = 0; i < text.length; i++)
			map[text[i]] = map[text[i]] ? map[text[i]] + 1 : 1;
		for (var k in map)
			sorted.push([k, map[k] / text.length]);
		sorted = sorted.sort(function (a, b) { 
			return (a[1] < b[1]) ? 1 : (a[1] > b[1]) ? -1 : 0; 
		});
		return sorted;
	};

	self.getKey = function(source, keylength){
		var key = [], newSource = "";
		for (var i = 0; i < source.length; i++)
			if (source[i] >= 'A' && source[i] <= 'Z')
				newSource += source[i];
		for (var i = 0; i < keylength; i++) {
			var chars = [];
			for (var j = i; j < newSource.length; j = j + keylength)
				chars.push(newSource[j]);
			chars = chars.join('');
			var freqMap = self.getFrequenceMap(chars);
			var decal = (26 + (self.map[freqMap[0][0]] - self.map['E']))%26;
			key.push(self.alpha[decal]);
		};
		self.key = key;
	};

	self.getSequence = function(FileEncrypted){
		var _sequencemap = new Array(), currentsequence, _analysisresult = {};
	
		for (var i = 0; i < FileEncrypted.length; i++) {
			if (FileEncrypted[i+2] != ""){
				currentsequence = FileEncrypted[i] + FileEncrypted[i+1] + FileEncrypted [i+2];
				_sequencemap[i] = new Array();
		 		_sequencemap[i][0] = currentsequence;
		 		_sequencemap[i][1] = i;
			}
		};

		var _sequenceresult = self.gettablespace(_sequencemap);

		for (var sr in _sequenceresult)
			if (_sequenceresult[sr].length >= 2)
				_analysisresult[sr] = _sequenceresult[sr][1] - _sequenceresult[sr][0];
		return _analysisresult;
	};

	self.getLengthKey = function(map){
		var factors = [];
		for (var m in map)
			for (var i = 2; i < 21; i++) {
				if (map[m]%i == 0)
				{
					if (!factors[i]){
						factors[i] = new Object();
						factors[i].myKey = i;
						factors[i].myValue = 1;
					}
					else
						factors[i].myValue += 1;
				}
			}

		return factors.sort(function(a, b){ return a.myValue < b.myValue ? 1 : a.myValue > b.myValue ? -1 : 0;})[0].myKey;
	};

	self.gettablespace = function(sequences){
		var tablespace = {};
		for (var i = 0; i < sequences.length; i++) {
			if (!tablespace[sequences[i][0]])			
				tablespace[sequences[i][0]] = [];
			tablespace[sequences[i][0]].push(sequences[i][1]);
		};
		return tablespace;
	};
};