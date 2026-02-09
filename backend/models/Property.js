const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    locationId: { // Reference to the Location model's custom ID (e.g., 'sigiriya') or Object Id if we switch later
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    reviewCount: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
        enum: ['hotel', 'villa'],
        required: true
    },
    amenities: [{
        type: String
    }],
    description: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
