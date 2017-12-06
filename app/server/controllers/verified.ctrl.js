const
  express = require('express'),
  router = express.Router(),
  UserModels = require('../models/user.model'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt-nodejs'),
  { formatJson } = require('../modules/format.json.response');

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.use('/', (req, res, next) => {
  var token = req.body.token || req.params.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, 'mernstackuserdashboard', function(err, decoded) {      
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

router.route('/test')
  .get((req, res) => {

    res.json({
      success: true
    })
  })

router.route('/users')
  .get((req, res) => {
    UserModels.find((err, users) => {
      if (err) {
        res.send(err);
      }

      res.json(users);
    });
  })

router.route('/user/:id')
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

module.exports = router;