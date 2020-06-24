const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Card name required'],
    minlength: 2,
    maxlength: 30,
    match: /^\S.*\S$/,
  },
  link: {
    type: String,
    required: [true, 'Link to card image required'],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'This is not a valid URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
