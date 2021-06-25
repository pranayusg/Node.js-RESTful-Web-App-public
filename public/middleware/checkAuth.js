/*****************************************************************************************************************
@Author:pranayusg
@Description: Token verification is done in this file
*****************************************************************************************************************/
// const fs = require('fs');
const jwt = require('jsonwebtoken');
const fs = require('fs');

var config = readConfig();

function readConfig() {
    return JSON.parse(fs.readFileSync('config.json'));
}

module.exports = (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization) {
            token = req.headers.authorization.split(" ")[1];
        }
        else {
            token = req.body.headers.authorization.split(" ")[1];
        }

        // jwt.verify verifies and returns decoded token while decode only returns decoded token for the provided input token
        const decoded = jwt.verify(token, config.privateKey);
        req.userData = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({
            status: 'Authorization failed',
            message: 'Please sign in to get the token and verify it to get complete access to the app'
        })
    }
};