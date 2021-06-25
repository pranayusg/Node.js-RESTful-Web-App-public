const path = require('path');
const express = require('express')
var morgan = require('morgan')
const form_details=require('./public/routes/form_details');
const nedb_demo=require('./public/routes/nedb_demo');
const usersRoutes=require('./public/routes/users');

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morgan('dev'));
app.use(express.static('public/view'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/user',usersRoutes)
app.use('/form',form_details)
app.use('/nedbDemo',nedb_demo)

module.exports=app;
