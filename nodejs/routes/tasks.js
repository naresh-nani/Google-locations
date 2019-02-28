const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

//Connect to mongodb 
const my_db=null;
const connection = (closure) => {
  return MongoClient.connect('mongodb://localhost:27017/wisestep', (err, db) => {
    if (err) return console.log(err);
    closure(db); 
    console.log(db);
  });

};

// Error Handling 
const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};
// Response handling

let response = {
  status:200,
  data: [],
  message: null
};

// Get users

router.get('/assign' , (req, res) => {
  connection((db) => {
    db.collection('locations')
      .find()
      .toArray()
      .then((product) => {
        response.data = product;
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
    });
});


//Get Single Task

router.get('/assign/:id', function (req,res, next) {
    db.locations.findOne({_id: mongojs.ObjectId(req.params.id)},
        function(err, user)
        {
            if(err)
            {
                res.send(err);
            }
            res.json(user);
    });

});

//Insert Data Into MongoDb
router.post("/add", (req, res, next) => {
  console.log(req.body.myCountry)
  var insert_data={
  	_id: new ObjectID(),
    location: req.body.myCountry,

  };
  connection((db) => { 
    db.collection('locations').insertOne(insert_data, function(err, result) {
       // console.log('Item inserted',insert_data);
      db.close();
      res.json("data Inserted");
    });
    });
});


module.exports = router; 
