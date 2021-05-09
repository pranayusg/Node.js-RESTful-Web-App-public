const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
var datastoreUsers = require('../model/datastoreUsers')
const bcrypt = require('bcrypt');
const moment = require('moment')
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
const { async } = require('q');
const checkAuth = require('../middleware/checkAuth');
const fs = require('fs');
var nodemailer = require('nodemailer');

const saltRounds = 10;
const token2={}

var config = readConfig();

function readConfig() {
    return JSON.parse(fs.readFileSync('config.json'));
}

router.post('/signup',
    body('email', 'Invalid email').notEmpty().isEmail().trim(),
    body('password', 'Password must be minimum 4 characters').isLength({ min: 4 }).custom((value, { req, loc, path }) => {
        if (value !== req.body.password2) {
            // trow error if passwords do not match
            throw new Error("Passwords don't match");
        } else {
            return value;
        }
    }), (req, res) => {


        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                if (err) {
                    console.error(err)
                }
                else {
                    // Store hash in your password DB.
                    var property = {
                        mail: req.body.email,
                        password: hash
                    }
                    datastoreUsers.checkMail(property.mail)
                        .then(function (result) {
                            if (result != null) {
                                res.status(404).json({
                                    message: 'This mail already exists'
                                })
                            }
                            else {
                                datastoreUsers.getCount()
                                    .then(function (count) {
                                        if (count > 2) {
                                            datastoreUsers.deleteUsers()
                                        }
                                        datastoreUsers.insertData(property)
                                        res.status(200).json({
                                            message: 'User saved'
                                        })
                                    })
                            }
                        });
                }
            })
        }
    })

    
router.post('/signin', (req, res) => {
    try {
        datastoreUsers.checkMail(req.body.email)
            .then(function (data) {
                if (data != null) {
                            bcrypt.compare(req.body.password, data.password, function (err, result) {
                                if (err) {
                                    console.error(err)
                                }
                                else {
                                    if (result == true) {
                                                payload = { mail: req.body.email, id: data._id }
                                                options ={ expiresIn: '1h' ,issuer:'pranayusg',audience:'Node.js RESTful Web App'}
                                                token = jwt.sign(payload, config.privateKey,options );

                                                /* Uncomment this after you put mailUsername and mailPassword in config.json file in root of this project
                                                var transporter = nodemailer.createTransport({
                                                    service: 'gmail',
                                                    auth: {
                                                      user: config.mailUsername,
                                                      pass: config.mailPassword
                                                    }
                                                  });
                                                  
                                                  var mailOptions = {
                                                    from: config.mailUsername,
                                                    to: 'pranayu6@gmail.com',
                                                    subject: 'Alert your Node.js RESTful Web App was accessed',
                                                    text: req.body.email+' has signed in your App'
                                                  }; 
                                                  
                                                  transporter.sendMail(mailOptions, function(error, info){
                                                    if (error) {
                                                      console.log('There is a error');
                                                    } else {
                                                      console.log('Email sent');
                                                    }
                                                  });
                                                  */

                                                res.status(200).json({
                                                     token: token
                                                })
                                    }
                                    else {
                                        res.status(404).json({
                                            message: 'wrong password'
                                        })
                                    }
                                }
                            });

                }
                else {
                    res.status(422).json({
                        message: "Mail doesn't exist.Please use the signup route to create user first"
                    })
                }
            });
    }
    catch (error) {
        res.status(400).json({
            message: 'Invalid request body'
        })
    }
})

router.get('/verifyToken',checkAuth, (req, res) => {
    token2.value=req.headers.authorization.split(" ")[1]
    req.userData.tokenDuration='1 hour'
    req.userData.issuedAt=moment.unix(req.userData.iat).format("DD-MM-YYYY H:mm:ss");
    req.userData.expiresAT=moment.unix(req.userData.exp).format("DD-MM-YYYY H:mm:ss");
    res.status(200).json(
        req.userData  
    )
})

router.get('/getToken', (req, res) => {
    res.status(200).json(
        token2
    )
})


module.exports = router;