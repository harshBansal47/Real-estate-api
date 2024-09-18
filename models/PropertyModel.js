const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  propertyTitle: {
    type: String,
    required: true,
    trim: true
  },
  propertyDescription: {
    type: String,
    trim: true
  },
  propertyType: {
    type: String,
    enum: ['Residential', 'Commercial', 'Industrial', 'Rental', 'Plot', 'Other'],
    required: true
  },
  propertyStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Ongoing', 'In Progress', 'Not Started'],
    required: true
  },
  propertyPrice: {
    type: String, // Keeping it as a String due to formatted input
    required: true,
    trim: true
  },
  propertyArea: {
    type: String, // Keeping it as a String for flexibility
    required: true,
    trim: true
  },
  propertyLocality: {
    type: String,
    required: true,
    trim: true
  },
  propertyCity: {
    type: String,
    required: true,
    trim: true
  },
  propertyZip: {
    type: String,
    required: true,
    trim: true
  },
  reraId: {
    type: String,
    trim: true
  },
  builderName: {
    type: String,
    trim: true
  },
  amenities: {
    dryer: { type: Boolean, default: false },
    outdoorShower: { type: Boolean, default: false },
    washer: { type: Boolean, default: false },
    gym: { type: Boolean, default: false },
    refrigerator: { type: Boolean, default: false },
    wifi: { type: Boolean, default: false },
    laundry: { type: Boolean, default: false },
    sauna: { type: Boolean, default: false },
    windowCoverings: { type: Boolean, default: false },
    airConditioning: { type: Boolean, default: false },
    lawn: { type: Boolean, default: false },
    swimmingPool: { type: Boolean, default: false },
    barbeque: { type: Boolean, default: false },
    microwave: { type: Boolean, default: false },
    tvCable: { type: Boolean, default: false }
  },
  highlights: [{
    type: String,
    trim: true
  }],
  locationMap: {
    latitude: {
      type: String,
      required: true,
      trim: true
    },
    longitude: {
      type: String,
      required: true,
      trim: true
    }
  },
  brandImage: {
    type: String, // Storing the image path as a string
    trim: true
  },
  siteImages: [{
    type: String, // Storing the file path as a string
    trim: true
  }],
  brochure: {
    type: String, // Storing the brochure file path
    trim: true
  },
  sitePlans: [{
    planPrice: {
      type: String,
      trim: true
    },
    planSize: {
      type: String,
      trim: true
    },
    planDescription: {
      type: String,
      trim: true
    },
    imageUpload: {
      type: String, // Storing the file path for the plan's image
      trim: true
    }
  }]
}, { timestamps: true });

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;