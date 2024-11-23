const mongoose = require('mongoose');

// Define a nested schema for the category
const categorySchema = new mongoose.Schema({
  name: { type: String, default: "Gallery" }, // Default category name
  services: {
    type: [String], // Array of strings
    default: [
      'Furniture',
      'Carpets',
      'Wooden Furniture',
      'Interior Design',
      'Painting',
      'Plumbing',
      'Electrical',
      'Carpentry',
    ], // Default services
  },
});

const gallerySchema = new mongoose.Schema({
  image: [
    {
      type: [], // Array of images
    },
  ],
  title: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  video: [
    {
      type: [], // Array of videos
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
  isActive: { type: Boolean, default: true },
  serviceStatus: { type: Boolean, default: true },
  category: { type: categorySchema, default: () => ({}) }, // Nested schema
});

// Create and export the model
const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;
