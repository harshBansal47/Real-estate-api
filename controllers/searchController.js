const Property = require('../models/PropertyModel'); // Assuming there is a Property model
const Builder = require('../models/BuilderModel'); // Assuming there is a Builder model
const City = require('../models/CityModel'); // Assuming there is a City model

exports.searchProperties = async (req, res) => {
  try {
    const { cityName, query } = req.query; // Extract cityName and query from query parameters

    if (!cityName || !query) {
      return res.status(400).json({
        success: false,
        message: 'City name and search query are required.',
      });
    }

    // Trim the city name and use a case-insensitive regex search
    const trimmedCityName = cityName.trim();
    const cityRegex = new RegExp(`^${trimmedCityName}$`, 'i');

    // Search for city by name with case-insensitivity
    const city = await City.findOne({ cityName: cityRegex });

    if (!city) {
      return res.status(404).json({
        success: false,
        message: 'City not found.',
      });
    }

    // Build search criteria based on query
    let searchCriteria = {
      $or: [
        { location: query },
        { builder: query },
        { project: query },
      ],
      city: cityName, // Ensure the property is in the specified city
    };

    // Find properties based on the search criteria
    const properties = await Property.find(searchCriteria);

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};