const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    propertyType: {
        type: String,
        enum: ['Residential', 'Commercial', 'Industrial', 'Land', 'Other'],
        required: true,
    },
    constructionStatus: {
        type: String,
        enum: ['Under Construction', 'Ready to Move', 'Pre-Launch', 'Launch'],
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    propertySize: {
        type: Number,
        required: true,
        min: 0,
    },
    locality: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    zip: {
        type: String,
        required: true,
        trim: true,
    },
    locationMap: {
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        }
    },
    reraNumber: {
        type: String,
        trim: true,
    },
    builder: {
        type: String,
        trim: true,
    },
    amenities: [{
        type: String,
        trim: true,
    }],
    highlights: [{
        type: String,
        trim: true,
    }],
    labelImage: {
        type: String,
        trim: true,
    },
    siteGallery: [{
        type: String,
        trim: true,
    }],
    brochure: {
        type: String,
        trim: true,
    },
    sitePlans: [{
        description: {
            type: String,
            trim: true,
        },
        size: {
            type: Number,
            min: 0,
        },
        image: {
            type: String,
            trim: true,
        },
        price: {
            type: Number,
            min: 0,
        }
    }]
}, { timestamps: true });

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
