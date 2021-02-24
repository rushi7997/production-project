let createError = require('http-errors');
let express = require('express');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const bodyParser = require('body-parser');
let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(cookieParser());

const users = require('./api/users');

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
(async () => {

  const client = await MongoClient.connect("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false", { useNewUrlParser:true });
  // const db = client.db('Udaan-19');
  const userDb = client.db('production_project');
  console.log('Connected to database');
  // app.use('/events', auth, events(db));
  app.use('/users', users(userDb));

})();

module.exports = app;
