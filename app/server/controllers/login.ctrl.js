const
	express = require('express'),
	router = express.Router(),
	UserModels = require('../models/user.model'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt-nodejs'),
  { formatJson } = require('../modules/format.json.response');
	
router.get('/login', (req, res) => {
  UserModels.find({username: req.query.username}, (err, result) => {
    if (err) {
      res.send(err);
    }

    if (result.length) {
      // username is valid, check password
      if (bcrypt.compareSync(req.query.password, result[0].password)) {
        // TODO: look in payload, must be plain obj - what is it used for
        /*var payload = {
          admin: "asdasdasd"
        }*/
        //let token = jwt.sign({username: result[0].username}, 'mernstackuserdashboard', {expiresIn: 86400}); // expires in 24 hours

        // valid password
        return res.json(formatJson.response(true, {
          _id: result[0]._id,
          username: result[0].username,
          fullName: result[0].fullName,
          email: result[0].email,
          token: jwt.sign({username: result[0].username}, 'mernstackuserdashboard', {expiresIn: 86400}) // expires in 24 hours
        }))
      } else {
        // invalid password
        return res.json(formatJson.response(false, {
          type: "client",
          message: "invalid password",
          description: "the password does not match username record"
        }))        
      }
    } else {
      // username was not found, client-side error
      return res.json(formatJson.response(false, {
        type: "client",
        message: "invalid username",
        description: "the username was not found"
      }))      
    }
  })
})

module.exports = router;