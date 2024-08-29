const Testimonial = require('../models/TestimonialModel'); // Adjust the path as necessary

exports.addTestimonial = async (req, res) => {
    const { clientName, feedback, clientImage } = req.body;

    if (!clientName || !feedback) {
        return res.status(400).json({
            success: false,
            message: 'Client name and feedback are required.'
        });
    }

    try {
        const newTestimonial = new Testimonial({
            clientName,
            feedback,
            clientImage // Optional, check if provided in the request
        });

        const savedTestimonial = await newTestimonial.save();
        
        res.status(201).json({
            success: true,
            message: 'Testimonial added successfully',
            data: savedTestimonial
        });
    } catch (error) {
        console.error('Failed to add testimonial:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
