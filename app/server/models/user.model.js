const mongoose = require('mongoose');

const UserModelSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  username: String,
  password: String
});

module.exports = mongoose.model('UserModel', UserModelSchema);