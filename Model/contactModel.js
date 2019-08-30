const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var url = require('../Config/config')
var connection = mongoose.createConnection(url.url, {
    useNewUrlParser: true
  });
autoIncrement.initialize(connection);


const Contact = mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
    nom:String,
    prenom:String,
    email:String,
    telephone:String,
    message:String,
    idAnnonce:String,
    vue: {
      type: Boolean,
      default:false
   },
   date:String
    
}, {
    timestamps: true
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true)

Contact.plugin(autoIncrement.plugin, 'Contact');
module.exports = mongoose.model('Contact',Contact);