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
mongoose.connect('mongodb://127.0.0.1:27017/mern_user_dashboard', {
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

/**
 * Express configuration.
 */
//app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
//app.set('port', 3001);
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');
//app.use(expressStatusMonitor());
//app.use(compression());
//app.use(sass({
//  src: path.join(__dirname, 'public'),
//  dest: path.join(__dirname, 'public')
//}));

app.use(logger('dev'));


// Permit the app to parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Use body-parser as middleware for the app
app.use(bodyParser.json());


//app.use(expressValidator());
//app.use(session({
//  resave: true,
//  saveUninitialized: true,
//  secret: process.env.SESSION_SECRET,
//  store: new MongoStore({
//    url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
//    autoReconnect: true,
//    clear_interval: 3600
//  })
//}));
//app.use(passport.initialize());
//app.use(passport.session());
//app.use(flash());
//app.use((req, res, next) => {
//  if (req.path === '/api/upload') {
//    next();
//  } else {
//    lusca.csrf()(req, res, next);
//  }
//});
//app.use(lusca.xframe('SAMEORIGIN'));
//app.use(lusca.xssProtection(true));
//app.use((req, res, next) => {
//  res.locals.user = req.user;
//  next();
//});
//app.use((req, res, next) => {
//  // After successful login, redirect back to the intended page
//  if (!req.user &&
//      req.path !== '/login' &&
//      req.path !== '/signup' &&
//      !req.path.match(/^\/auth/) &&
//      !req.path.match(/\./)) {
//    req.session.returnTo = req.path;
//  } else if (req.user &&
//      req.path === '/account') {
//    req.session.returnTo = req.path;
//  }
//  next();
//});
//app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

///**
// * Error Handler.
// */
//app.use(errorHandler());

/**
 * Start Express server.
 */
//app.listen(app.get('port'), () => {
//  console.log('%s App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
//  console.log('  Press CTRL-C to stop\n');
//});







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


var User = require('./models/user');

//router.route('/user(/:user_id)?')
//router.route(['/user', '/user/id/'])
router.route('/user')
  //.get((req, res) => {
  //  console.log(req.body)
  //  res.json({ message: '/user/:user_id' });
  //})
  .post((req, res) => {

    console.log(req.body)

    //var user = new User({
    //  first_name: req.body.first_name,
    //  last_name: req.body.last_name,
    //  email: req.body.email
    //});

    var user = new User(req.body);

    user.save(function(err) {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'User created!' });
    });

  })
  //.put((req, res) => {})
  //.delete('/:user_id', (req, res) => {});















var Bear = require('./models/bear');



// on routes that end in /bears
// ----------------------------------------------------
router.route('/bears')

  // create a bear (accessed at POST http://localhost:8080/bears)
  .post((req, res) => {
    

    
    console.log(req.body)



    var bear = new Bear({ name: req.body.name });    // create a new instance of the Bear model

    //bear.name = req.body.name;  // set the bears name (comes from the request)


    bear.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Bear created!' });
    });

    
  })

  // get all the bears (accessed at GET http://localhost:8080/api/bears)
  .get(function(req, res) {
    Bear.find(function(err, bears) {
      if (err)
        res.send(err);

      res.json(bears);
    });
  });

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/bears/:bear_id')

  // get the bear with that id
  .get(function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {
      if (err)
        res.send(err);
      res.json(bear);
    });
  })

  // update the bear with this id
  .put(function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {

      if (err)
        res.send(err);

      bear.name = req.body.name;
      bear.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Bear updated!' });
      });

    });
  })

  // delete the bear with this id
  .delete(function(req, res) {
    Bear.remove({
      _id: req.params.bear_id
    }, function(err, bear) {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  });





// Register routes
app.use('/api', router);

// Start the server
app.listen(port);
console.log('API server running on ' + port);













module.exports = app;
