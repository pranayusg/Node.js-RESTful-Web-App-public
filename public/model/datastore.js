/*****************************************************************************************************************
@Author:pranayusg
@Description: All NeDb interactions are done in this file
*****************************************************************************************************************/
var Datastore = require('nedb')
const db = new Datastore({ filename: 'public/database/NeDb.db' })
var Q = require('q');

var datastoreMethods = {};

db.loadDatabase();


datastoreMethods.insertData = function (data) {
  db.insert(data)
}

datastoreMethods.getFullData = function () {
  var defer = Q.defer();
  db.find({}, function (err, data) {
    defer.resolve(data)
  })

  return defer.promise;
}

// Find names of all males or females in the db (Use the dot-notation to match fields in subdocuments)
datastoreMethods.genderData = function (gender) {
  var defer = Q.defer();
  let output = []
  db.find({ "formdata.gender": gender }, function (err, docs) {
    for (var i = 0; i < docs.length; i++) {
      output.push({ firstName: docs[i].formdata.firstName, lastName: docs[i].formdata.lastName })
    }
    defer.resolve(output);
  });

  return defer.promise;
}

// Find a record based on id in db
datastoreMethods.getIdData = function (id) {
  var defer = Q.defer();
  db.find({ _id: id }, function (err, docs) {
    defer.resolve(docs);
  });

  return defer.promise;
}

// Finding all data whose firstname contain the substring 'ar' using a regular expression
datastoreMethods.substringData = function (str) {
  var defer = Q.defer();
  let output = []
  let re = new RegExp(str);
  
  db.find({ "formdata.firstName": re }, function (err, docs) {
    for (var i = 0; i < docs.length; i++) {
      output.push({ firstName: docs[i].formdata.firstName, lastName: docs[i].formdata.lastName })
    }
    defer.resolve(output);
  });

  return defer.promise;
}

// You can also deep-compare objects. Don't confuse this with dot-notation!
datastoreMethods.compareLocation = function (latitude, longitude) {
  var defer = Q.defer();

  db.find({ location: { lat: parseFloat(latitude), lon: parseFloat(longitude)} }, function (err, docs) {

    defer.resolve(docs);
  });

  return defer.promise;
}

// $lt, $lte, $gt and $gte work on numbers and strings
datastoreMethods.compareWeight = function (weight) {
  var defer = Q.defer();
  var output = []

  db.find({ "formdata.weight": { $gt: parseInt(weight) } }, function (err, docs) {
    for (var i = 0; i < docs.length; i++) {
      output.push({ firstName: docs[i].formdata.firstName, lastName: docs[i].formdata.lastName,weight:docs[i].formdata.weight })
      defer.resolve(output);
    }
  });

  return defer.promise;
}

// Using $in. $nin is used in the same way
datastoreMethods.inOperator = function (names) {
  var defer = Q.defer();

  db.find({ "formdata.firstName": { $in: names } }, function (err, docs) {
    defer.resolve(docs);
  });

  return defer.promise;
}

datastoreMethods.getCount = function () {
  var defer = Q.defer();
  db.find({}, function (err, data) {
   
    defer.resolve(data.length)
  })

  return defer.promise;
};

datastoreMethods.deleteData = function () {
  var defer = Q.defer();
  db.remove({}, { multi: true }, function(err, numDeleted) {
    console.log('Deleted', numDeleted, 'records');
});

  return defer.promise;
};

module.exports = datastoreMethods;