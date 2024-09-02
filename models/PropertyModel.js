const propertySchema = new Schema({
    propertyTitle: {
        type: String,
        required: true,
        trim: true
    },
    propertyDescription: {
        type: String,
        trim: true
    },
    propertyType: {
        type: String,
        enum: ['Residential', 'Commercial', 'Industrial', 'Land', 'Plot', 'Other'],
        required: true
    },
    propertyStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Ongoing', 'In Progress', 'Not Started'],
        required: true
    },
    propertyPrice: {
        type: String, // Changed from Number to String
        required: true,
        trim: true
    },
    propertyArea: {
        type: String, // Changed from Number to String
        required: true,
        trim: true
    },
    propertyLocality: {
        type: String,
        required: true,
        trim: true
    },
    propertyCity: {
        type: String,
        required: true,
        trim: true
    },
    propertyZip: {
        type: String,
        required: true,
        trim: true
    },
    reraId: {
        type: String,
        trim: true
    },
    builderName: {
        type: String,
        trim: true
    },
    amenities: {
        dryer: Boolean,
        outdoorShower: Boolean,
        washer: Boolean,
        gym: Boolean,
        refrigerator: Boolean,
        wifi: Boolean,
        laundry: Boolean,
        sauna: Boolean,
        windowCoverings: Boolean,
        airConditioning: Boolean,
        lawn: Boolean,
        swimmingPool: Boolean,
        barbeque: Boolean,
        microwave: Boolean,
        tvCable: Boolean
    },
    highlights: [{
        type: String,
        trim: true
    }],
    locationMap: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    brandImage: {
        type: String,
        trim: true
    },
    siteImages: [{
        type: String,
        trim: true
    }],
    brochure: {
        type: String,
        trim: true
    },
    sitePlans: [{
        planPrice: {
            type: String,
            trim: true
        },
        planSize: {
            type: String,
            trim: true
        },
        planDescription: {
            type: String,
            trim: true
        },
        imageUpload: {
            type: String,
            trim: true
        }
    }]
}, { timestamps: true });

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
