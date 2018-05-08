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

    if (bcrypt.compareSync(req.query.password, result[0].password)) {

      var payload = {
        admin: "asdasdasd"
      }

      // TODO: look in payload, must be plain obj - what is it used for




      let token = jwt.sign({username: result[0].username}, 'mernstackuserdashboard', {
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

module.exports = router;