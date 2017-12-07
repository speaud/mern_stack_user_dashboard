const
	express = require('express'),
	router = express.Router(),
	UserModels = require('../models/user.model'),
  bcrypt = require('bcrypt-nodejs'),
  { formatJson } = require('../modules/format.json.response');

router.post('/signup', (req, res) => {
  // TODO: server side validation
  let UserModel = new UserModels(req.body);
  
  bcrypt.hash(req.body.password, null, null, (err, hash) => {
    UserModel.password = hash   

    UserModel.save((err, UserModel) => {
      if (err) {
        res.send(err);
      }

      res.json(formatJson.response(true, UserModel, "New user created"));
    });
  });
})

module.exports = router;