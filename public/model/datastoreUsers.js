/*****************************************************************************************************************
@Author:pranayusg
@Description: All users db interactions are done in this file
*****************************************************************************************************************/
var Datastore = require('nedb')
const users = new Datastore({ filename: 'public/database/Users.db' })
var Q = require('q');

var datastoreMethods = {};

users.loadDatabase();

datastoreMethods.insertData = function (data) {
  users.insert(data)
}

datastoreMethods.checkMail = function (userMail) {
  var defer = Q.defer();
  users.findOne({ mail: userMail}, function (err, doc) {
    defer.resolve(doc)
  });

  return defer.promise;
};

datastoreMethods.getCount = function () {
  var defer = Q.defer();
  users.find({}, function (err, data) {
   
    defer.resolve(data.length)
  })

  return defer.promise;
};

datastoreMethods.deleteUsers = function () {
  var defer = Q.defer();
  users.remove({}, { multi: true }, function(err, numDeleted) {
    console.log('Deleted', numDeleted, 'user(s)');
});

  return defer.promise;
};


module.exports = datastoreMethods;