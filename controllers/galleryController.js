const Gallery = require('../models/GalleryModel'); // Adjust path as necessary

exports.addGallery = async (req, res) => {
    const { title, description, category, images } = req.body;

    if (!title || !category) {
        return res.status(400).json({
            success: false,
            message: 'Title and category are required'
        });
    }

    try {
        const newGallery = new Gallery({
            title,
            description,
            category,
            images
        });

        const savedGallery = await newGallery.save();

        res.status(201).json({
            success: true,
            message: 'Gallery added successfully',
            data: savedGallery
        });
    } catch (error) {
        console.error('Failed to add gallery:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
