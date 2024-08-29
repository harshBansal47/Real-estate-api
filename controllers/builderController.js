const Builder = require('../models/BuilderModel'); // Path to your Builder model

exports.addBuilder = async (req, res) => {
    try {
        const { groupName, logoImage, associatedProperties, cities, establishedYear, description } = req.body;
        
        // Create a new builder instance
        const newBuilder = new Builder({
            groupName,
            logoImage,
            associatedProperties, // Assuming this is an array of property IDs
            cities,               // Assuming this is an array of city IDs or names
            establishedYear,
            description
        });

        // Save the new builder to the database
        const savedBuilder = await newBuilder.save();

        // Return the newly created builder data
        res.status(201).json({
            success: true,
            message: "Builder added successfully",
            data: savedBuilder
        });
    } catch (error) {
        console.error('Failed to add builder:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add builder due to internal server error'
        });
    }
};
