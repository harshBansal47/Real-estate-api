const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
  {
    tag: { 
      type: String,
      required: true, 
    },
    images: [
      {
       type:String
      },
    ],
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Gallery', gallerySchema);