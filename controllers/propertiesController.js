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
exports.createProperty =async (req, res) => {
    try {
      // Access the payload data
      const propertyDetails = {
        propertyTitle: req.body.propertyTitle,
        propertyDescription: req.body.propertyDescription,
        propertyType: req.body.propertyType,
        propertyStatus: req.body.propertyStatus,
        propertyPrice: req.body.propertyPrice,
        propertyArea: req.body.propertyArea,
        propertyLocality: req.body.propertyLocality,
        propertyCity: req.body.propertyCity,
        propertyZip: req.body.propertyZip,
        reraId: req.body.reraId,
        builderName: req.body.builderName,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        amenities: req.body.amenities ? req.body.amenities.split(',') : [],
        highlights: req.body.highlights ? req.body.highlights.split(',') : [],
        sitePlans: [],
        siteImages: []
      };
      // Process site plans from the request body and files
      const sitePlans = [];
      if(req.body.sitePlans.length>0){
        req.body.sitePlans.forEach((plan,index)=>{
            sitePlans[index] = plan;
        })
        for (let i = 0; i < sitePlans.length; i++) {
            const imageField = `sitePlans[${i}][imageUpload]`;
            if (req.files[imageField]) {
              sitePlans[i].imageUpload = req.files[imageField][0].path; // Saving path instead of binary
            }
        }
      }




    //   Object.keys(req.body).forEach((key) => {
    //     const matches = key.match(/sitePlans/);
    //     console.log(matches)
    //     if (matches) {
    //       const index = parseInt(matches[1], 10);
    //       const field = matches[2];
    //       // Ensure the sitePlans array has the correct index
    //       if (!sitePlans[index]) {
    //         sitePlans[index] = {};
    //       }
    //       // Add the field value
    //       sitePlans[index][field] = req.body[key];
    //     }
    //   });
  
      // Add the image file paths to site plans
    //   for (let i = 0; i < sitePlans.length; i++) {
    //     const imageField = `sitePlans[${i}][imageUpload]`;
    //     if (req.files[imageField]) {
    //       sitePlans[i].imageUpload = req.files[imageField][0].path; // Saving path instead of binary
    //     }
    //   }
  

      propertyDetails.sitePlans = sitePlans;

      // Process and add dynamic site images
      Object.keys(req.files).forEach((key) => {
        const matches = key.match(/siteImages\[(\d+)\]/);
        if (matches) {
          const index = parseInt(matches[1], 10);
          propertyDetails.siteImages[index] = req.files[key][0].path; // Save the image path
        }
      });
  
      // Save other uploaded file paths
      propertyDetails.brandImage = req.files['brandImage'] ? req.files['brandImage'][0].path : null;
      propertyDetails.brochure = req.files['brochure'] ? req.files['brochure'][0].path : null;
  
      // Create a new property instance with the parsed details
      const newProperty = new Property(propertyDetails);
  
    //   // Save the new property to the database
     await newProperty.save();
  
      // Respond with success and the saved property details
      res.status(201).json({
        status: 'success',
        data: newProperty
      });
  
    } catch (error) {
        console.log(error);
      // Handle errors and respond with appropriate status and message
    //   handleErrorResponse(res, error, 'Property creation failed.');
    }
  };