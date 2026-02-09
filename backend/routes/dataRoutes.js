const express = require('express');
const router = express.Router();
const Location = require('../models/Location');
const Property = require('../models/Property');

// @route   GET /api/locations
// @desc    Get all locations
// @access  Public
router.get('/locations', async (req, res) => {
    try {
        const locations = await Location.find({});
        res.json(locations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/locations/:id
// @desc    Get location by ID
// @access  Public
router.get('/locations/:id', async (req, res) => {
    try {
        const location = await Location.findOne({ id: req.params.id });
        if (!location) {
            return res.status(404).json({ msg: 'Location not found' });
        }
        res.json(location);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/properties
// @desc    Get all properties (with optional filtering)
// @access  Public
router.get('/properties', async (req, res) => {
    try {
        const { locationId, type, priceRange } = req.query;
        let query = {};

        if (locationId) {
            query.locationId = locationId;
        }

        if (type && type !== 'all') {
            query.type = type;
        }

        // Price range logic can be handled here or frontend.
        // For now simple filtering matches exact values or ranges if implemented.
        // Example: priceRange=budget (<100)
        if (priceRange) {
            if (priceRange === 'budget') query.price = { $lt: 100 };
            else if (priceRange === 'mid') query.price = { $gte: 100, $lte: 300 };
            else if (priceRange === 'luxury') query.price = { $gt: 300 };
        }

        const properties = await Property.find(query);
        res.json(properties);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/properties/:id
// @desc    Get property by ID
// @access  Public
router.get('/properties/:id', async (req, res) => {
    try {
        const property = await Property.findOne({ id: req.params.id });
        if (!property) {
            return res.status(404).json({ msg: 'Property not found' });
        }
        res.json(property);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
