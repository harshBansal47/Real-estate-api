const mongoose = require('mongoose');

const citySchema = new mongoose.Schema(
  {
    cityName: {
      type: String,
      required: true,
      unique: true, // Ensuring each city name is unique
    },
    image: {
      type: String, // URL or path to the image associated with the city
      required: true,
    },
    localities: [
      {
        name: { type: String, required: true },
        associatedProperties: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Property', // References the Property model
          },
        ],
      },
    ], // Array of localities, each with a name and associated properties
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  }
);

module.exports = mongoose.model('City', citySchema);
