const mongoose = require('mongoose')

const pictureSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true
  },
  url: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
  // ,
  // owner: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true
  // }
}, {
  timestamps: true
})

module.exports = mongoose.model('Picture', pictureSchema)
