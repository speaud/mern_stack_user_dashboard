const
	express = require('express'),
	router = express.Router(),
	UserModels = require('../models/user.model'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt-nodejs'),
  { formatJson } = require('../modules/format.json.response');
	
router.post('/signup', (req, res) => {
  let UserModel = new UserModels(req.body);

  UserModel.save((err) => {
    if (err) {
      res.send(err);
    }

    res.json({ message: 'New user created' });
  });
})

module.exports = router;