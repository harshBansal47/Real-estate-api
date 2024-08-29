const Property = require('../models/PropertyModel');
const Builder = require('../models/BuilderModel');
const City = require('../models/CityModel');

exports.searchProperties = async (req, res) => {
  try {
    const { cityName, query } = req.query; // Extract cityName and the search term

    if (!cityName || !query) {
      return res.status(400).json({
        success: false,
        message: 'City name and search query are required.',
      });
    }

    // Trim and prepare for case-insensitive search
    const trimmedCityName = cityName.trim();
    const cityRegex = new RegExp(`^${trimmedCityName}$`, 'i');

    // Search for city by name
    const city = await City.findOne({ cityName: cityRegex });
    if (!city) {
      return res.status(404).json({
        success: false,
        message: 'City not found.',
      });
    }

    // Attempt to match query to a builder
    const builder = await Builder.findOne({ groupName: { $regex: new RegExp(query, 'i') } });
    if (builder) {
      const properties = await Property.find({ city: city._id, builder: builder._id });
      return res.status(200).json({
        success: true,
        count: properties.length,
        data: properties,
      });
    }

    // Attempt to match query to a locality within the city
    const propertiesByLocality = await Property.find({
      city: city._id,
      'localities.name': { $regex: new RegExp(query, 'i') }
    });

    if (propertiesByLocality.length > 0) {
      return res.status(200).json({
        success: true,
        count: propertiesByLocality.length,
        data: propertiesByLocality,
      });
    }

    // As a fallback, search for property names across all localities within the city
    const propertiesByName = await Property.find({
      city: city._id,
      project: { $regex: new RegExp(query, 'i') }
    });

    res.status(200).json({
      success: true,
      count: propertiesByName.length,
      data: propertiesByName,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};