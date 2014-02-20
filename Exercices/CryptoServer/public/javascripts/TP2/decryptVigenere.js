function AttackVigenere(attackCeasar){

	var self = this;

	self.attackCeasar = attackCeasar;
	self.key = "";
	self.textdecode = "";

	self.attack = function(FileEncrypted){

		self.textdecode = "";
		self.key = "";
		var sequencemap = {};
		var lengthkey = 0;

	 	sequencemap = self.getSequence(FileEncrypted);
	 	lengthkey = self.getLengthKey(sequencemap);
	 	//self.key = self.getKey(FileEncrypted, lengthkey);
	 	self.getKey(FileEncrypted, lengthkey);
	 	//self.textdecode = self.decode(FileEncrypted, lengthkey);

		return self.textdecode;
	};

	self.getKey = function(FileEncrypted, keylength){
		document.getElementById('result').value = "";

		//var alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
		//E etant la lettre la plus representee dans la langue francais, on entre le carre de vigenere pour la lettre e
		//var careE = ['E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D'];
		self.key = "";

		var part = Math.ceil(FileEncrypted.length/keylength);

		for (var i = 0; i < FileEncrypted.length; i=i+part) {
			//pour la portion, compter le nombre de caracteres
			var currentext = "";
			for (var y = i; y < FileEncrypted.length && y < i+part; y++)
				currentext += FileEncrypted[y];

			//Pour chaque currenttexte faire appel à l'attaque de cesar

			/*
			var frequences = getFrequenceMap(currentext);
			var maxf = frequences[0].myKey;

			for(var a = 0; a < alpha.length; a++)
				if (maxf == alpha[a])
					key += careE[a];
			*/
			//récuperer la clé décodée
			//Faire appel à césar pour déterminer le décalage
			var test = self.attackCeasar.attack(currentext);
			var decal = self.attackCeasar.attack(currentext);

			/*
			for (var d=0; d < decal.length; d++)
				if (decal[d] == '.' || decal[d] == ',' || decal[d] == ' ')
					decal.splice(d);


			for(var a = 0; a < alpha.length; a++)
				if ( decal[0] == alpha[a])
					self.key += careE[a];
			*/
			//self.key += self.attackCeasar.keyDecale[0];
			document.getElementById('result').value += test;


		};
		document.getElementById('key').value = self.key;
	};



	self.decode = function(source, keylength){

		var alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

		var map = {};
		var result = "";
		var keyIdx = 0;

		for (var i = 0; i < alpha.length; i++)
			map[alpha[i]] = i;

		for (var i = 0; i < source.length; i++){
			if (source[i] >= 'A' && source[i] <= 'Z'){
				if (keyIdx >= self.key.length)
					keyIdx = 0;
				result += alpha[(26 + map[source[i]] - map[self.key[keyIdx]]) % 26]; // Clé manquante
				keyIdx++;
			}
			else
				result += source[i];
		};
		return result;
	};

	self.getSequence = function(FileEncrypted){
		//Parcourir le string et trouver les fréquences se rétant;
		var _sequencemap = new Array();
		var currentsequence;
	
		for (var i = 0; i < FileEncrypted.length; i++) {
			if (FileEncrypted[i+2]!=""){
				currentsequence = FileEncrypted[i] + FileEncrypted[i+1] + FileEncrypted [i+2];
				_sequencemap[i] = new Array();
		 		_sequencemap[i][0] = currentsequence;
		 		_sequencemap[i][1] = i;
			}
		};

		var _sequenceresult = self.gettablespace(_sequencemap); //sequence + esapcements
		var _analysisresult = {};

		//Ajoute tous les éléments viables dans une nouvelle map
		for (var sr in _sequenceresult){
			if (_sequenceresult[sr].length>=2){
				var equals = self.equalsequence(_sequenceresult[sr]);
				_analysisresult[sr] = equals;
			}	
		};
		return _analysisresult;

	};

	self.getLengthKey = function(map){
		var factors = [];
		for (var m in map)
			for (var i = 2; i < 21; i++)
				if (map[m]%i == 0)
				{
					if (!factors[i]){
						factors[i] = new Object();
						factors[i].myKey = i;
						factors[i].myValue = 1;
					}
					else {
						factors[i].myValue += 1;	
					}
				}

		return factors.sort(function(a, b){
				if (a.myValue < b.myValue)
					return 1;
				else if (a.myValue > b.myValue)
					return -1;
				return 0;
			})[0].myKey;
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



	self.equalsequence = function(indexs){
		var range = indexs[1]-indexs[0];
		return range;
	};



	self.getFrequenceMap = function(text){
		var map = [];
		var length = 0;
		for (var i = 0; i < text.length; i++){
			if (!self.searchIn(map, text[i])){
				length++;
				map.push({ myKey: text[i], myValue : 1 });
			}
			else
				searchIn(map, text[i]).myValue++;
		};
		for (var i = 0; i < map.length; i++){
			map[i].myValue /= map.length; 
		};
		// Sort
		map = map.sort(function (a, b) { 
			if (a.myValue < b.myValue)
				return 1;
			else if (a.myValue > b.myValue)
				return -1;
			return 0;
		});
		return map;
	};



	self.searchIn = function(map, caract){
		for (var i = 0; i < map.length; i++) {
			if (map[i].myKey == caract)
				return map[i];
		};
		return null;
	};

};
