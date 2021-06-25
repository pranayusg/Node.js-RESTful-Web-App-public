const express = require('express')
const router = express.Router();
var datastore = require('../model/datastore')
const checkAuth = require('../middleware/checkAuth');

const data = {}

router.post('/location', (req, res) => {
    data.location = req.body
    res.end()
})

router.post('/formdata', checkAuth, (req, res) => {
    if (data.location == undefined) {
        res.send('Please click know your location to submit your location details');
    }
    else {
        delete req.body.headers;

        data.formdata = req.body
        data.timestamp = Date.now()
        data.formdata.age = parseInt(data.formdata.age)
        data.formdata.weight = parseInt(data.formdata.weight)
        
        datastore.getCount()
            .then(function (count) {
                if (count > 9) {
                    datastore.deleteData()
                    datastore.insertData(data).then((savedData)=>{
                        res.status(200).render('formdetails', {
                            title: 'FormDetails', firstName: savedData.formdata.firstName, lastName: savedData.formdata.lastName, description: savedData.formdata.description,
                            age: savedData.formdata.age, weight: savedData.formdata.weight, gender: savedData.formdata.gender, lat: savedData.location.lat, lon: savedData.location.lon
                        })
                     })
                     .catch(function (err) {
                        res.status(500).send("Something went wrong");
                    })
                }
                else {
                     datastore.insertData(data).then((savedData)=>{
                        res.status(200).render('formdetails', {
                            title: 'FormDetails', firstName: savedData.formdata.firstName, lastName: savedData.formdata.lastName, description: savedData.formdata.description,
                            age: savedData.formdata.age, weight: savedData.formdata.weight, gender: savedData.formdata.gender, lat: savedData.location.lat, lon: savedData.location.lon
                        })
                     })
                     .catch(function (err) {
                        res.status(500).send("Something went wrong");
                    })
                }
            })
            .catch(function (err) {
                res.status(500).send("Server didn't respond");
            })
    }
})

module.exports = router;
