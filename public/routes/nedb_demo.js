const express = require('express')
const router = express.Router();
var datastore = require('../model/datastore')
const checkAuth = require('../middleware/checkAuth');

router.get('/fullData',checkAuth, (req, res) => {
    datastore.getFullData()
        .then(function (data) {
            res.json(data)
        })
        .catch(function () {
            res.send('Sorry,Something went wrong')
        })
})

router.get('/genderData/:gender',checkAuth, (req, res) => {
    datastore.genderData(req.params.gender)
        .then(function (data) {
            res.json(data)
        })
        .catch(function () {
            res.send('Sorry,Something went wrong')
        })
})

router.get('/getIdData',checkAuth, (req, res) => {
    datastore.getIdData(req.headers.id)
        .then(function (data) {         
            res.json(data)
        })
        .catch(function () {
            res.send('Sorry,Something went wrong')
        })
})

router.get('/compareWeights',checkAuth, (req, res) => {
   
    datastore.compareWeight(req.headers.weight)
        .then(function (data) {
            res.json(data)
        })
        .catch(function () {
            res.send('Sorry,Something went wrong')
        })
})

router.get('/inOperator',checkAuth, (req, res) => {
    var inData=req.headers.inoperator
    var names=inData.split(",")
    
    for(var i=0;i<names.length;i++){
        names[i]=names[i].trim()
    }
 
    datastore.inOperator(names)
        .then(function (data) {
            res.json(data)
        })
        .catch(function () {
            res.send('Sorry,Something went wrong')
        })
})

router.get('/substringData',checkAuth, (req, res) => {
    var str=req.headers.substring.trim()
   
    datastore.substringData(str)
        .then(function (data) {
            res.json(data)
        })
        .catch(function () {
            res.send('Sorry,Something went wrong')
        })
})

router.get('/compareData',checkAuth,(req, res) => {
    var lat=req.query.compareLat.trim();
    var lon=req.query.compareLon.trim();
   
    datastore.compareLocation(lat,lon)
        .then(function (data) {
            res.json(data)
        })
        .catch(function () {
            res.send('Sorry,Something went wrong')
        })
})

module.exports = router;