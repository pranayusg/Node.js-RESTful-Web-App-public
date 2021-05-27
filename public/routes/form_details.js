const express = require('express')
const router = express.Router();
var datastore = require('../model/datastore')
const checkAuth = require('../middleware/checkAuth');

const data = {}

router.post('/location', (req, res) => {
    data.location = req.body
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
                        .then(function () {
                            datastore.insertData(data);
                            res.status(200).render('formdetails', {
                                title: 'FormDetails', firstName: data.formdata.firstName, lastName: data.formdata.lastName, description: data.formdata.description,
                                age: data.formdata.age, weight: data.formdata.weight, gender: data.formdata.gender, lat: data.location.lat, lon: data.location.lon
                            })
                        })
                }
                else {
                    datastore.insertData(data);

                    res.status(200).render('formdetails', {
                        title: 'FormDetails', firstName: data.formdata.firstName, lastName: data.formdata.lastName, description: data.formdata.description,
                        age: data.formdata.age, weight: data.formdata.weight, gender: data.formdata.gender, lat: data.location.lat, lon: data.location.lon
                    })

                }
            })
            .catch(function (err) {
                res.statusCode(500).send("Server didn't respond");
            })
    }
})

module.exports = router;
