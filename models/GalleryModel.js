const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    category: { 
      type: String,
      required: true, 
    },
    images: [
      {
        url: { type: String, required: true }, // URL or path to the image
        caption: { type: String, required: false }, // Optional caption for the image
      },
    ],
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Gallery', gallerySchema);