const Gallery = require('../models/GalleryModel'); // Adjust the path according to your project structure



// Function to add images to a gallery
const addImagesToGallery = async (req, res) => {
  try {
    const { tag, images } = req.body;

    // Create a new gallery document
    const newGallery = new Gallery({
      tag,
      images,
    });

    // Save the gallery document to the database
    const savedGallery = await newGallery.save();

    // Respond with the saved gallery
    res.status(201).json({status:"success"});
  } catch (error) {
    console.error('Error adding images to gallery:', error);
    res.status(500).json({ message: 'Failed to add images to gallery' });
  }
};


// Function to fetch all images from the gallery
const getAllImagesFromGallery = async (req, res) => {
  try {
    // Query the database to find all gallery documents
    const galleries = await Gallery.find();

    // Respond with the found galleries
    res.status(200).json(galleries);
  } catch (error) {
    console.error('Error fetching images from gallery:', error);
    res.status(500).json({ message: 'Failed to fetch images from gallery' });
  }
};

module.exports = {
  addImagesToGallery,
  getAllImagesFromGallery
};
