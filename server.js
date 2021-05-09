/*****************************************************************************************************************
@Author:pranayusg
@Description: Starting point of web app and all server interactions are done in this file
*****************************************************************************************************************/
const express = require('express')
const app = express();
const form_details=require('./public/routes/form_details');
const nedb_demo=require('./public/routes/nedb_demo');
const usersRoutes=require('./public/routes/users');

const port= process.env.PORT || 3000;

app.listen(port, () => console.log('lisening at '+port))
app.use(express.static('public/view'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/user',usersRoutes)
app.use('/form',form_details)
app.use('/nedbDemo',nedb_demo)


