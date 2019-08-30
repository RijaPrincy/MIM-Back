var authen = require('../Controller/authentification');
var venteIm = require('../Controller/annonceVente');



const express = require('express')
const route = express.Router()

function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        
       console.log(" Forbidden ");
        res.sendStatus(403);
    }    
}

//login register
route.post('/register',authen.register)
route.post('/login',authen.login)

//vente immobilier
route.post('/venteImm',verifyToken,venteIm.venteImm)
route.put('/updateVenteImm/:id',verifyToken,venteIm.updateVenteIm)
route.delete('/deleteVenteImm/:id',verifyToken,venteIm.deleteVenteIm)
route.get('/image/:im',venteIm.image)
route.post('/getVente',venteIm.getVenteIm)
route.get('/getAll',venteIm.getAll)
route.get('/getOne/:id',venteIm.getOne)
route.get('/getMesAnnonces/:id',venteIm.getMesAnnonces)


route.post('/contact',venteIm.contact)
route.get('/getContact/:id',venteIm.getContact)


route.put('/updateVisibilite',venteIm.updateVisibilite)

//post contact 2 test
route.put('/postcontact2',venteIm.Postcontact2)
route.put('/updateVisibilite2',venteIm.visibilite2)

module.exports = route