const bcrypt = require('bcrypt-nodejs');
const express = require('express');
//const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
//const chalk = require('chalk');
//const errorHandler = require('errorhandler');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify auth tokens

const { formatJson } = require('./modules/format.json.response')

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

// use morgan to log requests to the console
app.use(morgan('dev'));

// Permit the app to parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Use body-parser as middleware for the app
app.use(bodyParser.json());

// create our router
var router = express.Router();
var port = 3001;

// TODO: square away how secretOrPrivateKey will be set
app.set('superSecret', "mernstackuserdashboard"); // secret variable

router.use((req, res, next) => {
  next();
});




router.use('/test', require('./controllers/test.ctrl.js'))













const UserModels = require('./models/user.model');

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

router.route('/signup')
  .post((req, res) => {
    let UserModel = new UserModels(req.body);

    UserModel.save((err) => {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'New user created' });
    });
  })

router.route('/login')
  .get((req, res) => {
    console.log('api---/login')

    UserModels.find({username: req.query.username}, (err, result) => {
      if (err) {
        res.send(err);
      }

      if (bcrypt.compareSync(req.query.password, result[0].password)) {

        var payload = {
          admin: "asdasdasd"
        }

        // TODO: look in payload, must be plain obj - what is it used for
        let token = jwt.sign({username: result[0].username}, app.get('superSecret'), {
          expiresIn: 86400 // expires in 24 hours
        });

        return res.json(formatJson.response(true, {
          _id: result[0]._id,
          username: result[0].username,
          fullName: result[0].fullName,
          email: result[0].email,
          fullname: result[0].fullname,
          token: token,
          meta: {
            todo: "todo"
          }
        }, "Successful login"))
      } else {
        // TODO: /login response for invalid login attempt
        return res.json({
          user: "invalid"
        });
      }
    })
  })

// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------
router.use('/verified', (req, res, next) => {
  var token = req.body.token || req.params.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;  
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
      success: false, 
      message: 'No token provided.'
    });
    
  }
});

router.route('/verified/test')
  .get((req, res) => {

    res.json({
      success: true
    })
  })

router.route('/verified/users')
  .get((req, res) => {
    UserModels.find((err, users) => {
      if (err) {
        res.send(err);
      }

      res.json(users);
    });
  })

router.route('/verified/user/:id')
  .get((req, res) => {
    UserModels.findById(req.params.id, (err, result) => {
      if (err) {
        res.send(err);
      }
      return res.json(formatJson.response(true, result, "User found"))    
    })
  })
  .put((req, res) => {
    UserModels.findById(req.params.id, (err, result) => {
      // The 'result' object returned from mongoose doesn't access the properties directly
      // It uses the prototype chain hence hasOwnProperty will return false

      for (key in req.body) {
        if (result.get(key)) {
          result[key] = req.body[key]
        } else {
          //TODO: better error handling
          console.log(key + " key not found")
        }
      }

      result.save((err) => {
        if (err) {
          res.send(err);
        }
        
        return res.json(formatJson.response(true, result, "User updated"))
      })
    })
  })
  .delete((req, res) => {
    UserModels.remove({
      _id: req.body.id
    }, (err, result) => {
      if (err) {
        res.send(err);
      }

      return res.json(formatJson.response(true, result, "User successfully deleted"))
    });
  });

// Register routes
app.use('/api', router);

// Start the server
app.listen(port);

console.log('API server running on ' + port);

module.exports = app;