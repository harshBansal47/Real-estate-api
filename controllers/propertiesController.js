const Property = require('../models/PropertyModel');

// Controller function to add a new property with logging and a 'success' status
const addProperty = async (req, res) => {
    console.log('Received request to add a new property'); // Initial log statement

    try {
        // Log the incoming request body to check data
        console.log('Request Body:', req.body);

        // Destructure the request body
        const {
            name,
            description,
            propertyType,
            constructionStatus,
            price,
            propertySize,
            locality,
            city,
            zip,
            locationMap,
            reraNumber,
            builder,
            amenities,
            highlights,
            labelImage,
            siteGallery,
            brochure,
            sitePlans
        } = req.body;

        // Log individual fields if necessary
        console.log('Property Name:', name);
        console.log('Property Type:', propertyType);
        console.log('Location:', city, zip);

        // Create a new Property instance
        const newProperty = new Property({
            name,
            description,
            propertyType,
            constructionStatus,
            price,
            propertySize,
            locality,
            city,
            zip,
            locationMap,
            reraNumber,
            builder,
            amenities,
            highlights,
            labelImage,
            siteGallery,
            brochure,
            sitePlans
        });

        // Log the property object before saving
        console.log('New Property Object:', newProperty);

        // Save the property to the database
        const savedProperty = await newProperty.save();

        // Log successful save
        console.log('Property saved successfully:', savedProperty);

        // Return success response with status: 'success'
        res.status(201).json({
            status: 'success',
            property: savedProperty
        });
    } catch (error) {
        // Log the error details
        console.error('Error adding property:', error.message);
        res.status(500).json({
            status: 'error',
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = {
    addProperty,
};