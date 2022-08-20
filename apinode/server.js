var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
const {request} = require("express");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// connection configurations
var dbConn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'api'
});
// connect to database
dbConn.connect();

const cors = require('cors');
app.use(cors());
// default route
app.get('/', function (req, res) {
  return res.send({ error: true, message: 'hello',data:{nombre:"miguel"} })
});


// Retrieve all users
app.get('/users', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  dbConn.query('SELECT * FROM users', function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'users list.' });
  });
});


// Retrieve user with id
app.get('/user/:id', function (req, res) {
  let user_id = req.params.id;
  if (!user_id) {
    return res.status(400).send({ error: true, message: 'Please provide user_id' });
  }
  dbConn.query('SELECT * FROM users where id=?', user_id, function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results[0], message: 'users list.' });
  });
});


// Add a new user

app.post('/user', function (req, res) {

  // let user = req.body
  let user = {name: req.body.name, email: req.body.email, created_at: req.body.created_at}

  // let user = req.body.user;
  if (!user) {
    return res.status(400).send({ error:true, message: 'Please provide user' });
  }
  dbConn.query("INSERT INTO users SET ? ", user, function (error, results, fields) {
  // dbConn.query("INSERT INTO users SET ? ", { user }, function   (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
  });
});


//  Update user with id
app.put('/user', function (req, res) {
  // let user_id = req.body.user_id;
  // let user = req.body.user;
  let user_id = req.body.user_id;
  let user = {name: req.body.name, email: req.body.email, created_at: req.body.created_at}

  if (!user_id || !user) {
    return res.status(400).send({ error: user, message: 'Please provide user and user_id' });
  }
  dbConn.query("UPDATE users SET ? WHERE id = ?", [user, user_id], function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'user has been updated successfully.' });
  });
});


//  Delete user
app.delete('/user', function (req, res) {
  let user_id = req.body.user_id;
  if (!user_id) {
    return res.status(400).send({ error: true, message: 'Please provide user_id' });
  }
  dbConn.query('DELETE FROM users WHERE id = ?', [user_id], function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'User has been updated successfully.' });
  });
});


// set port
app.listen(3003, function () {
  console.log('Node app is running on port 3003');
});
module.exports = app;