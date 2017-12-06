const express = require('express');  
const router = express.Router();

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// Test route to make sure everything is working
router.get('/', function (req, res) {
	res.json({message: 'test: (module) api server is running'});
})

module.exports = router;