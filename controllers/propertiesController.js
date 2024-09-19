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



// Controller function to fetch a property by ID
exports.getPropertyById = async (req, res) => {
    try {
        const propertyId = req.params.id; // Get the ID from the request parameters

        // Fetch the property from the database by ID
        const property = await Property.findById(propertyId);

        // Check if the property exists
        if (!property) {
            return res.status(404).json({
                status: 'error',
                message: 'Property not found'
            });
        }

        // Return a success response with the fetched property
        res.status(200).json({
            status: 'success',
            message: 'Property retrieved successfully',
            data: property // Include the property object in the response
        });
    } catch (error) {
        // Log the error
        console.error('Error retrieving the property:', error);

        // Return an error response if there's a server error or bad input (such as an invalid ID format)
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve the property. Please check the ID and try again later.',
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
    try {

        console.log(req.body);
        process.exit(1);
        const newProperty = new Property({
            ...req.body,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            amenities: req.body.amenities,
            highlights: req.body.highlights || [],
        });

        // Handle site plans and file uploads
        if (req.body.sitePlans) {
            newProperty.sitePlans = req.body.sitePlans.map((plan, index) => ({
                planPrice: plan.planPrice,
                planSize: plan.planSize,
                planDescription: plan.planDescription,
                imageUpload: req.files[`sitePlans[${index}][imageUpload]`]?.[0]?.path,
            }));
        }

        if (req.files) {
            if (req.files['brandImage']) {
                newProperty.brandImage = req.files['brandImage'][0].path;
            }
            if (req.files['siteImages[]']) {
                newProperty.siteImages = req.files['siteImages[]'].map(file => file.path);
            }
            if (req.files['brochure']) {
                newProperty.brochure = req.files['brochure'][0].path;
            }
        }

        await newProperty.save();
        res.status(201).json({ status: 'success', data: newProperty });
    } catch (error) {
        handleErrorResponse(res, error, 'Property creation failed.');
    }
};