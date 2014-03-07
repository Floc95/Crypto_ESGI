/**
 * Created by Marine on 02/03/14.
 */
function Certificat(){
    //TO DO : classe permettant de générer et gérer les
    var self = this;

    self.privatekey = '';
    self.publickey = '';
    self.signature = '';
    self.statut = '';

    /*
        Génération d'une clé privée
        Créer un fichier de demande de signature de certificat (CRS Certificate Signin Request)
            Exemple ??? :
            //a partir de la clé privée préalablement crée
                Country Name (2 letter code) [AU]:FR
                State or Province Name (full name) [Some-State]:CORSE
                Locality Name (eg, city) []:Ajaccio
                Organization Name (eg, company) [Internet Widgits Pty Ltd]:LLB
                Organizational Unit Name (eg, section) []:BTSINFO
                Common Name (eg, YOUR name) []:wiki.domain1.org
                Email Address []:
    */
    //Création d'un nouveau formulaire
    //Validation d'un formulaire
        //Délivrance du certificat


    self.generatePrivateKey = function(){
        //Génration de la clé privée
    };

    self.generatePublicKey = function(){

    };

    self.createCertificat= function(){
        //TO DO : création du certificat, par défaut, il n'est pas validé
    };

    self.validateCertificate = function(){
        //TO DO : Validation du certificat (variable passant de true a false dans le fichier JSON certificats.
    };

    self.saveCertificate = function(){

    };

    self.validCertificat = function(){
        
    };
};

exports.Certificat = Certificat;