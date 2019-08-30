var r = require("./Route/route")
const express = require('express');
const dbConfig = require('./Config/config');
const mongoose = require('mongoose');



const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();


app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload({
  useTempFiles : false
}));


 mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});



app.use('/', r);


const port = process.env.PORT || 8080


app.listen(port, () => {
  console.log(port);
});

module.exports = app;
