const Property = require('../models/PropertyModel'); // Import the Property model

// Controller function to create a new property
exports.createProperty = async (req, res) => {
    console.log('Received request to create property'); // Log initial request

    try {
        // Step 1: Extract property data from the request body
        const {
            propertyTitle,
            propertyDescription,
            propertyType,
            propertyStatus,
            propertyPrice,
            propertyArea,
            propertyLocality,
            propertyCity,
            propertyZip,
            reraId,
            builderName,
            amenities,
            highlights,
            locationMap,
            brandImage,
            siteImages,
            brochure,
            sitePlans
        } = req.body;

        

        const errors = {};
        if (!propertyTitle) errors.propertyTitle = "Property title is missing";
        if (!propertyType) errors.propertyType = "Property type is missing";
        if (!propertyStatus) errors.propertyStatus = "Property status is missing";
        if (propertyPrice == null) errors.propertyPrice = "Property price is missing";
        if (!propertyArea) errors.propertyArea = "Property area is missing";
        if (!propertyLocality) errors.propertyLocality = "Property locality is missing";
        if (!propertyCity) errors.propertyCity = "Property city is missing";
        if (propertyZip == null) errors.propertyZip = "Property zip is missing";

        if (Object.keys(errors).length > 0) {
            console.log('Validation failed: Required fields are missing:', errors);
            return res.status(400).json({
                status: 'error',
                message: 'Required fields are missing',
                errors: errors
            });
        }

        console.log('Validation passed'); // Log validation success


       
        // Step 3: Create a new property document using the provided data
        const newProperty = new Property({
            propertyTitle,
            propertyDescription,
            propertyType,
            propertyStatus,
            propertyPrice,
            propertyArea,
            propertyLocality,
            propertyCity,
            propertyZip,
            reraId,
            builderName,
            amenities,
            highlights,
            locationMap,
            brandImage,
            siteImages,
            brochure,
            sitePlans
        });
        //console.warn("EROR FINDING: ", newProperty)
        console.log('Created new property document:'); // Log the new property document

        // Step 4: Save the property to the database
        const savedProperty = await newProperty.save();
        console.log('Property saved to database:'); // Log the saved property

        // Step 5: Return a success response with the saved property
        res.status(201).json({
            status: 'success',
            message: 'Property created successfully',
           
        });
    } catch (error) {
        // Log the error
        console.error('Error creating property:', error);

        // Step 6: Return an error response
        res.status(500).json({
            status: 'error',
            message: 'Failed to create property. Please try again later.',
            error: error.message
        });
    }
};
