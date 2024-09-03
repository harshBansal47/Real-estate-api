const Property = require('../models/PropertyModel'); // Import the Property model

// Controller function to fetch all properties
exports.getAllProperties = async (req, res) => {
    try {
        // Fetch all properties from the database
        const properties = await Property.find({}); // The empty object {} means no filter criteria, so it fetches all

        // Check if properties exist in the database
        if (properties.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'No properties found'
            });
        }

        // Return a success response with the fetched properties
        res.status(200).json({
            status: 'success',
            message: 'Properties retrieved successfully',
            data: properties // Include the array of properties in the response
        });
    } catch (error) {
        // Log the error
        console.error('Error retrieving properties:', error);

        // Return an error response
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve properties. Please try again later.',
            error: error.message
        });
    }
};


// Controller function to delete a property
exports.deleteProperty = async (req, res) => {
    const propertyId = req.params.id; // Extracting property ID from URL parameters

    console.log(`Received request to delete property with ID: ${propertyId}`); // Log initial request

    try {
        // Step 1: Check if the property exists
        const property = await Property.findById(propertyId);
        if (!property) {
            return res.status(404).json({
                status: 'error',
                message: 'Property not found'
            });
        }

        // Step 2: Delete the property
        await Property.findByIdAndDelete(propertyId);

        console.log('Property deleted successfully'); // Log successful deletion

        // Step 3: Return a success response
        res.status(204).json({ // 204 No Content is often used for successful delete requests
            status: 'success',
            message: 'Property deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting property:', error); // Log the error

        // Return an error response
        res.status(500).json({
            status: 'error',
            message: 'Failed to delete property. Please try again later.',
            error: error.message
        });
    }
};


// Controller function to update a property
exports.updateProperty = async (req, res) => {
    const propertyId = req.params.id; // Extracting property ID from URL parameters

    console.log(`Received request to update property with ID: ${propertyId}`); // Log initial request

    try {
        // Step 1: Check if the property exists
        const property = await Property.findById(propertyId);
        if (!property) {
            return res.status(404).json({
                status: 'error',
                message: 'Property not found'
            });
        }

        // Step 2: Update the property with new data from the request body
        const updatedFields = req.body;
        const updatedProperty = await Property.findByIdAndUpdate(propertyId, updatedFields, { new: true });

        console.log('Property updated successfully'); // Log successful update

        // Step 3: Return a success response with the updated property
        res.status(200).json({
            status: 'success',
            message: 'Property updated successfully',
            data: updatedProperty
        });
    } catch (error) {
        console.error('Error updating property:', error); // Log the error

        // Return an error response
        res.status(500).json({
            status: 'error',
            message: 'Failed to update property. Please try again later.',
            error: error.message
        });
    }
};



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
