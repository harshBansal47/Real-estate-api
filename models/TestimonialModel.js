const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now, // Automatically sets the date to the current date
    },
    clientImage: {
      type: String, // URL or path to the client's image (optional)
      required: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);