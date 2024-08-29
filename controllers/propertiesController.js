const Property = require('../models/PropertyModel'); // Path to your Property model

exports.addProperty = async (req, res) => {
    try {
        const {
            city, location, builder, project, description,
            price, mainImage, siteImages, galleryOfSitePlans,
            locationMap, amenities, highlights, propertyType,
            propertySize, constructionStatus, reraNumber, brochure
        } = req.body;

        // Create a new property instance
        const newProperty = new Property({
            city,
            location,
            builder,
            project,
            description,
            price,
            mainImage,
            siteImages,
            galleryOfSitePlans,
            locationMap,
            amenities,
            highlights,
            propertyType,
            propertySize,
            constructionStatus,
            reraNumber,
            brochure
        });

        // Save the new property to the database
        const savedProperty = await newProperty.save();

        // Return the newly created property data
        res.status(201).json({
            success: true,
            message: "Property added successfully",
            data: savedProperty
        });
    } catch (error) {
        console.error('Failed to add property:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add property due to internal server error'
        });
    }
};
