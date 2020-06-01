const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User name required'],
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: [true, 'User about required'],
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, 'Link to user avatar required'],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'This is not a valid URL',
    },
  },
  email: {
    type: String,
    required: [true, 'Email required'],
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'This is not a valid email',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password required'],
  },
});

module.exports = mongoose.model('user', userSchema);
