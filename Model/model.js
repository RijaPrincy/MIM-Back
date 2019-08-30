const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var url = require('../Config/config')

var connection = mongoose.createConnection(url.url, {
    useNewUrlParser: true
  });
autoIncrement.initialize(connection);


const Agences = mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
    nom: String,
    prenom:String,
    email: String,
    passWord: String
    
}, {
    timestamps: true
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true)

Agences.plugin(autoIncrement.plugin, 'Agences');
module.exports = mongoose.model('Agences',Agences);