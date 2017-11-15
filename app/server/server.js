const express = require('express');
//const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
//const chalk = require('chalk');
//const errorHandler = require('errorhandler');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const mongoose = require('mongoose');

/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/mern_user_dashboard2', {
  useMongoClient: true
});

mongoose.connection.on('error', (err) => {
    console.error(err);
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.');
    process.exit();
  })
  .once('open', () => {
    console.log("MongoDB connection live");
    console.log('\tDB:', mongoose.connection.name);
    // TODO: .collections, .models
  });

app.use(logger('dev'));

// Permit the app to parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Use body-parser as middleware for the app
app.use(bodyParser.json());

// create our router
var router = express.Router();
var port = 3001;

// Middleware to use for all requests
router.use(function(req, res, next) {
  //console.log(req.db)
  next();
});

// Test route to make sure everything is working
router.get('/test', function(req, res) {
  res.json({ message: 'test', prop: 'valchanged' });
});








// - /users
// - /users/:id
// - /users/check/:key/:value
// - /signup
// - /login
// - /recover

const UserModels = require('./models/user.model');

router.route('/users')
  .get(function(req, res) {
    UserModels.find((err, users) => {
      if (err) {
        res.send(err);
      }

      res.json(users);
    });
  })






router.route('/users/check/:key/:value')
  .get((req, res) => {
    console.log(req.params)

    UserModels.find({[req.params.key]: req.params.value}, (err, result) => {
      if (err) {
        res.send(err);
      }

      if (result.length) {
        res.json({[req.params.key]: req.params.value, unique: false});
      } else {
        res.json({[req.params.key]: req.params.value, unique: true});
      }
    })
  })














router.route('/user/check/username/:username')
  .get((req, res) => {
    UserModels.find({ username: req.params.username }, (err, result) => {
      if (err) {
        res.send(err);
      }

      if (result.length) {
        res.json({username: req.params.username, unique: false, message: "Username is not unique"});
      } else {
        res.json({username: req.params.username, unique: true, message: "Username is unique"});
      }
    })
  })

router.route('/user/check/email/:email')
  .get((req, res) => {
    UserModels.find({ email: req.params.email }, (err, result) => {
      if (err) {
        res.send(err);
      }

      if (result.length) {
        res.json({email: req.params.email, unique: false, message: "Email is not unique"});
      } else {
        res.json({email: req.params.email, unique: true, message: "Email is unique"});
      }
    })
  })  

router.route('/user/signup')
  .post((req, res) => {
    let UserModel = new UserModels(req.body);

    UserModel.save((err) => {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'New user created' });
    });
  })











// Register routes
app.use('/api', router);

// Start the server
app.listen(port);

console.log('API server running on ' + port);

module.exports = app;