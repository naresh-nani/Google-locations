var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var tasks = require('./routes/tasks');
// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/wisestep", function(err, db) {
  if(!err) {
    console.log("MongoDB connected");
  }
  else{
    console.log("MongoDB is Not Connected");
  }
});

var port =3000;
var app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//set Static Folder
 app.use(express.static(path.join(__dirname, 'client')));

 //body parser MW
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended: false}));
 app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

 app.use('/',index);
 app.use('/api',tasks);

 app.listen(port, function(){
     console.log('Server started on port '+port);
 });
