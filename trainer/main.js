function setup_db() {
  //mongodb connection stuff
  var MONGO_URL = process.env.MONGO_URL || "127.0.0.1"
  var db = require('monk')(MONGO_URL + "/training")
  return db
}

function setup_classifier() {
  natural = require('natural')
  var classifier = new natural.BayesClassifier()
  classifier.events.on('trainedWithDocument', function (obj) {
    console.log(obj);
  });
  return classifier
}

function train(classifier) {
  var train_data_collection = db.get('data')
  data_set = train_data_collection.find({}).then((data) => {
    //create a the documents for training
    console.log("start training with dataset of " + data.length)
    for (var index in data) {
      data_for_learning = data[index]
      classifier.addDocument(data_for_learning.text, data_for_learning.stem)
    }
 
    // train the model
    classifier.train()

    console.log("training done")

    // serialize
    var raw_classifier_output = JSON.stringify(classifier);
    var classifier_collection = db.get('classifier')
    classifier_collection.insert({ raw: raw_classifier_output, timestamp: new Date() }).then(() => {
      console.log("training saved");
      db.close()
    });
   })
}

//setup database
var db = setup_db()

//create a classifier
var classifier = setup_classifier()

//start the training
train(classifier)