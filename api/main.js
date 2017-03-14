var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser')

var port = process.env.PORT || 3000;
var app = express();
app.use( morgan('dev') );
app.use( bodyParser.json() );  

function setup_db() {
  //mongodb connection stuff
  var MONGO_URL = process.env.MONGO_URL || "127.0.0.1"
  var db = require('monk')(MONGO_URL + "/training")
  return db
}

app.post('/training', function (req, res) {
  var train_data_collection = db.get('data')
  train_data_collection.insert({ text: req.body.text, stem: req.body.stem}).then(() => {
      console.log("↓ new learning data added ↓");
      console.log("text ► " + req.body.text);
      console.log("stem ► " + req.body.stem);
      console.log("--");
  });
  res.json({"data": "added"})
})

app.get('/predict', function (req, res) {
  console.log("↓ going to predict ↓");
  console.log("text ► " + req.query.text);
  console.log("--");

  var classifier_collection = db.get('classifier')
  //return the latest classifier training model
  classifier_collection.find({},{limit:1, sort: {timestamp: -1}},function(e,docs){
    natural = require('natural')
    console.log(docs[0]);
    var classifier = natural.BayesClassifier.restore(JSON.parse(docs[0].raw));
    var outcome = classifier.classify(req.query.text);
    console.log("outcome ► " + outcome);
    res.json({"outcome": outcome});
  })
  console.log("--");
})




var db = setup_db();
app.listen(port);
console.log("API started at port " +port);