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
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
  isActive: { type: Boolean, default: true },
});

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;