var cryptoSys = new Cryptosysteme();
document.getElementById('key').value = cryptoSys.keygen;


var runEncode = function(){
	var clair = document.getElementById('clair').value;
	var crypted = cryptoSys.encode(clair, cryptoSys.keygen);
	document.getElementById('crypted').value = crypted;
};

var runDecode = function(){
	var crypted = document.getElementById('crypted').value;
	var clair = cryptoSys.decode(crypted, cryptoSys.keygen);
	document.getElementById('reclair').value = clair;
};

/**********************************************************/

var attackSys = new AttackSysteme();

var runAttack = function(){
	var content = document.getElementById('attack').value;
	var res = attackSys.attack(content);
	document.getElementById('resAttack').value = res;
};