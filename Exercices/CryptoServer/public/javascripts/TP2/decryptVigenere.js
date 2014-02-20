function AttackVigenere(){

	var self = this;

	self.key = "";
	self.textdecode = "";
	self.referenceMap = null;
	self.alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	self.map = {};

	for (var i = 0; i < self.alpha.length; i++) {
		self.map[self.alpha[i]] = i;
	};

	self.attack = function(source){

		self.textdecode = "";
		self.key = "";
		var sequencemap = {};
		var lengthkey = 0;

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
		for (var i = 0; i < text.length; i++) {
			if (!map[text[i]])
				map[text[i]] = 1;
			else
				map[text[i]]++;
		}
		for (var k in map)
			sorted.push([k, map[k] / text.length]);
		
		sorted = sorted.sort(function (a, b) { 
			return (a[1] < b[1]) ? 1 : (a[1] > b[1]) ? -1 : 0; 
		});
		return sorted;
	};

	self.createReference = function(){
		var refText = "Pendant une demiheure encore, nos pieds foulèrent ces couches dossements. Nous allions en avant, poussés par une ardente curiosité. Quelles autres merveilles renfermait cette caverne, quels trésors pour la science  Mon regard sattendait à toutes les surprises, mon imagination à tous les étonnements.Les rivages de la mer avaient depuis longtemps disparu derrière les collines de lossuaire. Limprudent professeur, sinquiétant peu de dégarer, mentraînait au loin. Nous avancions silencieusement, baignés dans les ondes électriques. Par un phénomène que je ne puis expliquer, et grâce à sa diffusion, complète alors, la lumière éclairait uniformément les diverses faces des objets. Son foyer nexistait plus en un point déterminé de lespace et elle ne produisait aucun effet dombre. On aurait pu se croire en plein midi et on plein été, au milieu des régions équatoriales, sous les rayons verticaux du soleil. Toute vapeur avait disparu. Les rochers, les montagnes lointaines, quelques masses confuses de forêts éloignées, prenaient un étrange aspect sous légale distribution du fluide lumineux. Nous ressemblions à ce fantastique personnage dHoffmann qui a perdu son ombre. Après une marche dun mille, apparut la lisière dune forêt immense, mais non plus un de ces bois de champignons qui avoisinaient PortGraüben.Cétait la végétation de lépoque tertiaire dans toute sa magnificence. De grands palmiers, despèces aujourdhui disparues, de superbes palmacites, des pins, des ifs, des cyprès, des thuyas, représentaient la famille des conifères, et se reliaient entre eux par un réseau de lianes inextricables. Un tapis de mousses et dhépathiques revêtait melleusement le sol. Quelques ruisseaux murmuraient sous ces ombrages, peu dignes de ce nom, puisquils ne produiraient pas dombre. Sur leurs bords croissaient des fougères arborescentes semblables à celles des serres chaudes du globe habité. Seulement, la couleur manquait à ces arbres, à ces arbustes, à ces plantes, privés de la vivifiante chaleur du soleil. Tout se confondait dans une teinte uniforme, brunâtre et comme passée. Les feuilles étaient dépourvues de leur verdeur, et les fleurs ellesmêmes, si nombreuses à cette époque tertiaire qui les vit naître, alors sans couleurs et sans parfums, semblaient faites dun papier décoloré sous laction de latmosphère. Mon oncle Lidenbrock saventura sous ces gigantesques taillis. Je le suivis, non sans une certaine appréhension. Puisque la nature avait fait là les frais dune alimentation végétale, pourquoi les redoutables mammifères ne sy rencontreraientils pas. Japercevais dans ces larges clairières que laissaient les arbres abattus et rongés par le temps, des légumineuses, des acérinés, des rubiacées, et mille arbrisseaux comestibles, chers aux ruminants de toutes les périodes. Puis apparaissaient, confondus et entremêlés, les arbres des contrées si différentes de la surface du globe, le chêne croissant près du palmier, leucalyptus australien sappuyant au sapin de la Norwège, le bouleau du Nord confondant ses branches avec les branches du kauris zélandais. Cétait à confondre la raison des classificateurs les plus ingénieux de la botanique terrestre. Soudain je marrêtai, De la main, je retins mon oncle.La lumière diffuse permettait dapercevoir les moindres objets dans la profondeur des taillis. Javais cru voir... non. réellement, de mes yeux, je voyais des formes immenses sagiter sous les arbres . En effet, cétaient des animaux gigantesques, tout un troupeau de mastodontes, non plus fossiles, mais vivants, et semblables à ceux dont les restes furent découverts en mille huit cent un dans les marais de lOhio . Japercevais ces grands éléphants dont les trompes grouillaient sous les arbres comme une légion de serpents. Jentendais le bruit de leurs longues défenses dont livoire taraudait les vieux troncs. Les branches craquaient, et les feuilles arrachées par masses considérables sengouffraient dans la vaste gueule de ces monstres. Ce rêve, où javais vu renaître tout ce monde des temps antéhistoriques, des époques ternaire et quaternaire, se réalisait donc enfin . Et nous étions là, seuls, dans les entrailles du globe, à la merci de ses farouches habitants . Cependant les heures sécoulèrent. La situation ne changeait pas, mais un incident vint la compliquer. En cherchant à mettre un peu dordre dans la cargaison, je vis que la plus grande partie des objets embarqués avaient disparu au moment de lexplosion, lorsque la mer nous assaillit si violemment . Je voulus savoir exactement à quoi men tenir sur nos ressources, et, la lanterne à la main, je commençai mes recherches. De nos instruments, il ne restait plus que la boussole et le chronomètre. Les échelles et les cordes se réduisaient à un bout de câble enroulé autour du tronçon de mât. Pas une pioche, pas un pic, pas un marteau, et, malheur irréparable, nous navions pas de vivres pour un jour . Je fouillai les interstices du radeau, les moindres coins formés par les poutres et la jointure des planches . Rien . Nos provisions consistaient uniquement en un morceau de viande sèche et quelques biscuits. Je regardais dun air stupide . Je ne voulais pas comprendre . Et cependant de quel danger me préoccupaisje  Quand les vivres eussent été suffisants pour des mois, pour des années, comment sortir des abîmes où nous entraînait cet irrésistible torrent  À quoi bon craindre les tortures de la faim, quand la mort soffrait déjà sous tant dautres formes  Mourir dinanition, estce que nous en aurions le temps  Pourtant, par une inexplicable bizarrerie de limagination, joubliai le péril immédiat pour les menaces de lavenir qui mapparurent dans toute leur horreur. Dailleurs, peutêtre pourrionsnous échapper aux fureurs du torrent et revenir à la surface du globe. Comment  je lignore. Où  Quimporte . Une chance sur mille est toujours une chance, tandis que la mort par la faim ne nous laissait despoir dans aucune proportion, si petite quelle fût. La pensée me vint de tout dire à mon oncle, de lui montrer à quel dénûment nous étions réduits, et de faire lexact calcul du temps qui nous restait à vivre. Mais jeus le courage de me taire. Je voulais lui laisser tout son sangfroid. En ce moment, la lumière de la lanterne baissa peu à peu et séteignit entièrement. La mèche avait brûlé jusquau bout. Lobscurité redevint absolue. Il ne fallait plus songer à dissiper ces impénétrables ténèbres. Il restait encore une torche, mais elle naurait pu se maintenir allumée. Alors, comme un enfant, je fermai les yeux pour ne pas voir toute cette obscurité. Après un laps de temps assez long, la vitesse de notre course redoubla. Je men aperçus à la réverbération de lair sur mon visage. La pente des eaux devenait excessive. Je crois véritablement que nous ne glissions plus. Nous tombions. Javais en moi limpression dune chute presque verticale. La main de mon oncle et celle de Hans, cramponnées à mes bras, me retenaient avec vigueur. Tout à coup, après un temps inappréciable, je ressentis comme un choc ; le radeau navait pas heurté un corps dur, mais il sétait subitement arrêté dans sa chute. Une trombe deau, une immense colonne liquide sabattit à sa surface. Je fus suffoqué. Je me noyais… Cependant, cette inondation soudaine ne dura pas. En quelques secondes je me trouvai a lair libre que jaspirai à pleins poumons. Mon oncle et Hans me serraient le bras à le briser, et le radeau nous portait encore tous les trois.";
		refText = self.removeDiacritics(refText);
		refText = refText.toUpperCase();
		refText = refText.split(" ").join("");
		refText = refText.split(",").join("");
		refText = refText.split(".").join("");

		self.referenceMap = self.getFrequenceMap(refText);
	};

	self.createReferenceExtern = function(){
		var freq = new Array(0.084,0.0106,0.0303,0.0418,0.1726,0.0112,0.0127,0.0092,0.0734,0.0031,0.0005,0.0601,0.0296,0.0713,0.0526,0.0301,0.0099,0.0655,0.0808,0.0707,0.0574,0.0132,0.0004,0.0045,0.0030,0.0012);
		var sorted = [];
		for (var i = 0; i < self.alpha.length; i++)
			sorted.push([self.alpha[i], freq[i]]);
		sorted = sorted.sort(function (a, b) { 
			return (a[1] < b[1]) ? 1 : (a[1] > b[1]) ? -1 : 0; 
		});

		self.referenceMap = sorted;
	};

	self.getKey = function(source, keylength){
		var key = [];
		var newSource = "";
		for (var i = 0; i < source.length; i++)
			if (source[i] >= 'A' && source[i] <= 'Z')
				newSource += source[i];
		//self.createReference();
		self.createReferenceExtern();
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

	self.searchIn = function(map, caract){
		for (var i = 0; i < map.length; i++) {
			if (map[i].myKey == caract)
				return map[i];
		};
		return null;
	};

};
