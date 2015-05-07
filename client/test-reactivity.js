var collection = new Mongo.Collection(null);
var variable = new ReactiveVar(null);

Meteor.startup(function () {
  Tracker.autorun(function () {
    console.log("variable value", variable.get());
  });
  
  Tracker.autorun(function () {
    console.log("collection value", collection.findOne());
  });
  
  function data(document) {
    console.log("collection observe value", document);
  }
  
  collection.find().observe({
    added: data,
    changed: data,
    removed: data
  });

  Meteor.setTimeout(function () {
    variable.set(true);
    collection.insert({value: true});
  }, 1000);
});
