const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  image: [
    {
      type: String,
    }
  ],
  title: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true 
  },
  video: [
    {
      type: String,
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;