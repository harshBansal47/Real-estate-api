const Property = require('../models/PropertyModel'); // Assuming there is a Property model

exports.searchProperties = async (req, res) => {
  try {
    const { city, keyword } = req.query;

    if (!city || !keyword) {
      return res.status(400).json({
        success: false,
        message: 'City name and search query are required.'
      });
    }

    const trimmedCityName = city.trim();
    const cityRegex = new RegExp(`^${trimmedCityName}$`, 'i');

    // // Find city using case-insensitive search
    // const city_ = await City.findOne({ cityName: cityRegex });

    // if (!city_) {
    //     return res.status(404).json({
    //         success: false,
    //         message: 'City not found.'
    //     });
    // }

    const escapeRegex = (text) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    const queryRegex = new RegExp(escapeRegex(keyword), 'i');

    // Build search criteria using multiple fields
    let searchCriteria = {
      $or: [
        { location: queryRegex },
        { builder: queryRegex },
        { project: queryRegex },
        { propertyTitle: queryRegex },
        { propertyDescription: queryRegex },
        { propertyLocality: queryRegex },
        { builderName: queryRegex }
      ],
      propertyCity: cityRegex // Match city name with propertyCity field
    };

    const properties = await Property.find(searchCriteria);

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties
    });
  } catch (error) {
    console.error('Error searching properties:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};