const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City',
      required: true,
    },
    location: {
      type: String,
    },
    builder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Builder',
    },
    project: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String, // e.g., "500,000 onwards"
      required: true,
    },
    mainImage: {
      type: String, // URL to the main image of the property
      required: true,
    },
    siteImages: [
      {
        url: { type: String, required: true },
        caption: { type: String },
      },
    ], // Array of images with URLs and optional captions
    galleryOfSitePlans: [
      {
        url: { type: String, required: true },
        caption: { type: String },
      },
    ], // Array of site plan images with URLs and optional captions
    locationMap: {
      type: String, // URL to the location map image or embed link
      required: true,
    },
    amenities: [
      {
        type: String,
        required: true,
      },
    ], // Array of amenities, each being a string
    highlights: [
      {
        type: String,
        required: true,
      },
    ], // Array of key points or highlights about the property
    propertyType: {
      type: String, // e.g., "Apartment", "Villa", "Commercial"
      required: true,
    },
    propertySize: {
      type: Number, // e.g., Size in square feet or square meters
      required: true,
    },
    constructionStatus: {
      type: String, // e.g., "Under Construction", "Ready to Move", "Upcoming"
      required: true,
    },
    reraNumber: {
      type: String, // RERA registration number for compliance
      required: true,
      unique: true, // Ensuring each property has a unique RERA number
    },
    brochure: {
      type: String, // URL or path to the PDF file for the property brochure
      required: false, // Optional field
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Property', propertySchema);
