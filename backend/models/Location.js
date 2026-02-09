const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    default: 'Sri Lanka'
  },
  image: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
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
  propertyCount: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  longDescription: {
    type: String
  },
  bestTimeToVisit: {
    type: String
  },
  attractions: [{
    type: String
  }],
  tips: [{
    type: String
  }],
  activities: [{
    type: String
  }],
  gettingThere: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Location', locationSchema);
