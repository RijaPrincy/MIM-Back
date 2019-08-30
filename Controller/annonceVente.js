var AnnonceVente = require('../Model/annonceModel');
var Contact = require('../Model/contactModel');
const jwt = require('jsonwebtoken');
const fs = require('fs');


module.exports.image = (req, res) => {
    try {
        let a = fs.readFileSync('./Controller/public/' + req.params.im + ".jpg")
        res.write(a)
        res.end()
    } catch (e) {
        console.log("tsy lasa le sary", e.stack);
    }
}

module.exports.venteImm = function (req, res) {

    var pays = req.body.pays,
        codePostale = req.body.codePostale,
        commune = req.body.commune,
        address = req.body.address,
        type = req.body.type,
        nbPiece = req.body.nbPiece,
        nbChambre = req.body.nbChambre,
        surfaceTerrain = req.body.surfaceTerrain,
        caracteristique = req.body.caracteristique,
        prix = req.body.prix,
        description = req.body.description,



        image = req.body.image,
        image1 = req.body.image1,
        image2 = req.body.image2,
        image3 = req.body.image3,



        idPoster = req.body.idPoster,
        typeV = req.body.typeV //location ou 


    // console.log("file", req.files);
    var imageFile = req.files.file;
    var imageFile1 = req.files.file1;
    var imageFile2 = req.files.file2;
    var imageFile3 = req.files.file3;



    console.log(req.body.pays);


    if (typeV && pays && commune && type &&  surfaceTerrain &&  prix && description && idPoster) {


        jwt.verify(req.token, 'test', (err, authData) => {
            if (err) {
                console.log("forbidden2", req.token);

                res.sendStatus(403);
            } else {

                const articles = new AnnonceVente({ date: new Date(), typeV, pays, codePostale, commune, address, type, nbPiece, nbChambre, surfaceTerrain, caracteristique, prix, description, image, image1, image2, image3, idPoster });
                articles.save()
                    .then((note) => {
                        imageFile.mv(`${__dirname}/public/${image}.jpg`, function (err) {
                            if (err) {
                                return res.status(500).send(err);
                            }
                        });
                        imageFile1.mv(`${__dirname}/public/${image1}.jpg`, function (err) {
                            if (err) {
                                return res.status(500).send(err);
                            }
                        });
                        imageFile2.mv(`${__dirname}/public/${image2}.jpg`, function (err) {
                            if (err) {
                                return res.status(500).send(err);
                            }
                        });
                        imageFile3.mv(`${__dirname}/public/${image3}.jpg`, function (err) {
                            if (err) {
                                return res.status(500).send(err);
                            }
                        });

                        res.json({
                            message: 'Post created...',
                            authData,
                            note
                        });

                    })
                    .catch(e => {
                        console.log(e);

                        res.status(500).send({ mes: e.mes || "erreur" })
                    })



            }
        });




    } else {
        console.log("typeV: ", req.body.typeV, "pays: ", req.body.pays, "commune: ", req.body.commune, "type: ",
            req.body.type, "nbPiece: ", req.body.nbPiece, "surfaceTerrain: ", req.body.surfaceTerrain, "caracteristique: ", req.body.caracteristique, "prix: ",
            req.body.prix, "description: ", req.body.description, "idPoster: ", req.body.idPoster);
        res.send("not ok")
    }

}






module.exports.updateVenteIm = function (req, res) {

    var pays = req.body.pays,
        codePostale = req.body.codePostale,
        commune = req.body.commune,
        address = req.body.address,
        type = req.body.type,
        nbPiece = req.body.nbPiece,
        nbChambre = req.body.nbChambre,
        surfaceTerrain = req.body.surfaceTerrain,
        caracteristique = req.body.caracteristique,
        prix = req.body.prix,
        description = req.body.description,
        image = req.body.image,
        image1 = req.body.image1,
        image2 = req.body.image2,
        image3 = req.body.image3,
        idPoster = req.body.idPoster,
        typeV = req.body.typeV


    var imageFile = req.files.file;
    var imageFile1 = req.files.file1;
    var imageFile2 = req.files.file2;
    var imageFile3 = req.files.file3;
    console.log(req.files.file.length);




    if (typeV && pays && commune && type &&  surfaceTerrain &&  prix && description && idPoster) {

        jwt.verify(req.token, 'test', (err, authData) => {
            if (err) {
                console.log("forbidden2", req.token);

                res.sendStatus(403);
            } else {
                AnnonceVente.findByIdAndUpdate(req.params.id, { pays, codePostale, commune, address, typeV,type, nbPiece, nbChambre, surfaceTerrain, caracteristique, prix, description, image, image1, image2, image3, idPoster })
                    .then((note) => {
                        imageFile.mv(`${__dirname}/public/${image}.jpg`, function (err) {
                            if (err) {
                                return res.status(500).send(err);
                            }
                        });
                        imageFile1.mv(`${__dirname}/public/${image1}.jpg`, function (err) {
                            if (err) {
                                return res.status(500).send(err);
                            }
                        });
                        imageFile2.mv(`${__dirname}/public/${image2}.jpg`, function (err) {
                            if (err) {
                                return res.status(500).send(err);
                            }
                        });
                        imageFile3.mv(`${__dirname}/public/${image3}.jpg`, function (err) {
                            if (err) {
                                return res.status(500).send(err);
                            }
                        });
                        res.json({
                            message: 'Post created...',
                            authData,
                            note
                        });

                    })

                    .catch(e => {
                        console.log(e);

                        res.status(500).send({ mes: e.mes || "erreur" })
                    })

            }
        });



    } else {

        res.send("not ok")
    }

}


module.exports.deleteVenteIm = function (req, res) {
    jwt.verify(req.token, 'test', (err, authData) => {
        if (err) {
            console.log("forbidden2", req.token);

            res.sendStatus(403);
        } else {
            AnnonceVente.findByIdAndDelete(req.params.id)
                .then(re => {
                    console.log(re);
                    res.send(re)

                }).catch(er => {
                    console.log(er);

                })
        }

    })
}

module.exports.getVenteIm = function (req, res) {
    var id1 = req.body.id1,
        id2 = req.body.id2
    AnnonceVente.find({ "_id": { $gte: id1, $lt: id2 } })
        .then(re => {
            res.send(re)
        }).catch(er => {
            res.send(er)
        })

}

module.exports.getAll = function (req, res) {
    AnnonceVente.find()
        .then(re => {
            res.send(re)
        }).catch(er => {
            res.send(er)
        })

}

module.exports.getOne = function (req, res) {
    AnnonceVente.findById(req.params.id)
        .then(re => {
            res.send(re)
        }).catch(er => {
            res.send(er)
        })

}

module.exports.getMesAnnonces = function (req, res) {
    AnnonceVente.find({ idPoster: req.params.id })
        .then(re => {
            res.send(re)
        }).catch(er => {
            res.send(er)
        })

}

module.exports.contact = function (req, res) {
    var nom = req.body.nom,
        prenom = req.body.prenom,
        telephone = req.body.telephone,
        email = req.body.email,
        message = req.body.message
    idAnnonce = req.body.idAnnonce

    if (nom && prenom && message && email) {
        const contact = new Contact({ nom, prenom, telephone, email, message, idAnnonce, date: new Date() })
        contact.save()
            .then(resp => {
                res.send(resp)
            }).catch(er => {
                console.log(er);

            })
    } else {
        res.send("not ok")
    }
}



module.exports.getContact = function (req, res) {
    Contact.find({ idAnnonce: req.params.id })
        .then(resp => {
            res.send(resp)
        }).catch(er => {
            console.log(er);

        })
}



module.exports.updateVisibilite = function (req, res) {

    Contact.findById(req.body.id)
        .then(resp => {

            Contact.findByIdAndUpdate(req.body.id, { vue: !resp.vue })
                .then(resp2 => {
                    res.send(resp2)
                }).catch(err => {
                    console.log(err);

                })

        }).catch(err => {
            console.log(err);

        })

}


module.exports.Postcontact2 = function (req, res) {
    var nom = req.body.nom,
        prenom = req.body.prenom,
        telephone = req.body.telephone,
        email = req.body.email,
        message = req.body.message
    vue = req.body.vue


    AnnonceVente.findById(req.body.id)
        .then(resp => {
            //console.log(resp.contact);
            var temp = resp.contact
            temp.push({ nom: nom, prenom: prenom, telephone: telephone, email: email, message: message, vue: vue })


            AnnonceVente.findByIdAndUpdate(req.body.id, { contact: temp })
                .then(resp2 => {
                    console.log("reasp2", resp2.contact);

                    res.send(resp2)
                }).catch(err => {
                    console.log(err);

                })

        }).catch(err => {
            console.log(err);

        })
}

module.exports.visibilite2 = function (req, res) {
    var idAnnonce = req.body.idAnnonce,
        index = req.body.index

    AnnonceVente.findById(idAnnonce)
        .then(resp => {

            console.log("resp",resp.contact[parseInt(index)]);

            var temp0=resp.contact
            temp0[parseInt(index)].vue=!temp0[parseInt(index)].vue
            
           
            console.log("temp",temp0);
            
            AnnonceVente.findByIdAndUpdate(idAnnonce,{contact:temp0})
                .then(resp2 => {
                    res.send(resp2)
                }).catch(err => {
                    console.log(err);

                })
        }).catch(er => {
            console.log(er);

        })

}