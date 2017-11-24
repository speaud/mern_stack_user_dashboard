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

// use body parser so we can get info from POST and/or URL parameters
// app.use(bodyParser.urlencoded({ extended: false }));

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





// Middleware to use for all requests
// See http://expressjs.com/en/guide/using-middleware.html and https://www.npmjs.com/package/jsonwebtoken
// app.use('/user/:id', (req, res, next) => {

    // Check header or url parameters or post parameters for auth token

    // Decode auth token

      // Verify secretOrPrivateKey and checks expiration

        // If good, save to 'req' object for use in other api routes

      // If there is no token

// })    

// ----------/\ example \/


//// ---------------------------------------------------------
//// route middleware to authenticate and check token
//// ---------------------------------------------------------
//apiRoutes.use(function(req, res, next) {
//
//  // check header or url parameters or post parameters for token
//  var token = req.body.token || req.param('token') || req.headers['x-access-token'];
//
//  // decode token
//  if (token) {
//
//    // verifies secret and checks exp
//    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
//      if (err) {
//        return res.json({ success: false, message: 'Failed to authenticate token.' });    
//      } else {
//        // if everything is good, save to request for use in other routes
//        req.decoded = decoded;  
//        next();
//      }
//    });
//
//  } else {
//
//    // if there is no token
//    // return an error
//    return res.status(403).send({ 
//      success: false, 
//      message: 'No token provided.'
//    });
//    
//  }
//  
//});
























// Test route to make sure everything is working
router.get('/test', function(req, res) {
  res.json({ message: 'test', prop: 'valchanged' });
});






const UserModels = require('./models/user.model');

// - /api

// - /users
// - /users/:id
// - /users/check/:key/:value

// - /authenticate <-- generates auth token
// - /signup
// - /login
// - /recover

// - /api/verified <-- requires auth token

// NOTE: Use req.params, req.body, or req.query

//router.route('/users')
//  .get((req, res) => {
//    UserModels.find((err, users) => {
//      if (err) {
//        res.send(err);
//      }
//
//      res.json(users);
//    });
//  })

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


        // Generate authtoken



        var payload = {
          admin: "asdasdasd"
        }
        //        var token = jwt.sign(payload, app.get('superSecret'), {
//          expiresIn: 86400 // expires in 24 hours
//        });
//
//        res.json({
//          success: true,
//          message: 'Enjoy your token!',
//          token: token
//        });


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

        //return res.json({
        //  _id: result[0]._id,
        //  username: result[0].username,
        //  email: result[0].email,
        //  fullname: result[0].fullname
        //});










      } else {
        // TODO: /login response for invalid login attempt

        //return res.json(formatJson.response(false, null, "Unsuccessful login"))
        //return formatJson.response(false, null, "Unsuccessful login")

        return res.json({
          user: "invalid"
        });
      }
    })
  })

router.route('/authenticate')




//  .get((req, res) => {
//    console.log('api---/login')
//
//    UserModels.find({username: req.query.username}, (err, result) => {
//      if (err) {
//        res.send(err);
//      }
//
//      if (bcrypt.compareSync(req.query.password, result[0].password)) {
//
//
//        // Generate authtoken
//
//
//        return res.json({
//          _id: result[0]._id,
//          username: result[0].username,
//          email: result[0].email,
//          fullname: result[0].fullname
//        });
//      } else {
//        // TODO: /login response for invalid login attempt
//        return res.json({
//          user: "invalid"
//        });
//      }
//    })
//  })
//
//
//
//
//


//  .post((req, res) => {
//
//
//
//
//
//        var payload = {
//          admin: "asdasdasd"
//        }
//        var token = jwt.sign(payload, app.get('superSecret'), {
//          expiresIn: 86400 // expires in 24 hours
//        });
//
//        res.json({
//          success: true,
//          message: 'Enjoy your token!',
//          token: token
//        });
//
//
//
//
//
//
//
//  })
//
//
//
//

// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------
router.use('/verified', (req, res, next) => {
  console.log("verified route")
  
  console.log('req.body.token = ' + req.body.token)
  console.log('req.params.token = ' + req.params.token)
  console.log('req.headers[x-access-token] = ' + req.headers['x-access-token'])

  // check header or url parameters or post parameters for token
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

  //next();
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




















// Register routes
app.use('/api', router);

// Start the server
app.listen(port);

console.log('API server running on ' + port);

module.exports = app;