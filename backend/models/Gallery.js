const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  image: [
    {
      type: [],

    }
  ],
  title: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true,/
  },
  video: [
    {
      type: [],
    }
  ]
});

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;