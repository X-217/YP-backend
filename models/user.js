const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User name required'],
    minlength: 2,
    maxlength: 30,
    match: /^\S.?\S$/gm,
  },
  about: {
    type: String,
    required: [true, 'User about required'],
    minlength: 2,
    maxlength: 30,
    match: /^\S.?\S$/gm,
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
    select: false,
  },
});

userSchema.plugin(uniqueValidator);


userSchema.methods.hide = function (secret) {
  if (!userSchema.options.toObject) {
    userSchema.options.toObject = {};
  }
  userSchema.options.toObject.transform = function (doc, ret) {
    delete ret[secret];
    return ret;
  };
  return this.toObject();
};

module.exports = mongoose.model('user', userSchema);
