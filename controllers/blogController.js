const Blog = require('../models/Blog'); // Make sure the path to your Blog model is correct

exports.addBlog = async (req, res) => {
    const { title, content, author, images, tags, isPublished, comments } = req.body;

    if (!title || !content || !author.name) {
        return res.status(400).json({
            success: false,
            message: 'Title, content, and author name are required'
        });
    }

    try {
        const newBlog = new Blog({
            title,
            content,
            author,
            images,
            tags,
            isPublished,
            comments
        });

        const savedBlog = await newBlog.save();

        res.status(201).json({
            success: true,
            message: 'Blog added successfully',
            data: savedBlog
        });
    } catch (error) {
        console.error('Failed to add blog:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
