const mongoose = require('mongoose');

const builderSchema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true,
      unique: true, // Ensuring each builder group has a unique name
    },
    logoImage: {
      type: String, // URL or path to the builder's logo image
      required: true,
    },
    associatedProperties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property', // References to the Property model
      },
    ],
    cities: [
      {
        type: String,
        required: true,
      },
    ], // Array of cities where the builder has properties
    establishedYear: {
      type: Number, // The year the builder group was established
      required: true,
    },
    description: {
      type: String, // Short description of the builder group
      required: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  }
);

module.exports = mongoose.model('Builder', builderSchema);