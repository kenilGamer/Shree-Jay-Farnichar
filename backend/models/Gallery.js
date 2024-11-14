const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  image: [
    {
      type: [],

    }
  ],
  title: String,
  description: String,
  video: [
    {
      type: [],
    }
  ]
});

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;