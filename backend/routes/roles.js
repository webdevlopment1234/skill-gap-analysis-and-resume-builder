const express = require('express');
const Role = require('../models/Role');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// GET /api/roles — Fetch all roles from MongoDB
router.get('/', authMiddleware, async (req, res) => {
    try {
        const roles = await Role.find({}, 'roleName requiredSkills');
        res.json(roles);
    } catch (err) {
        console.error('Roles fetch error:', err);
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;
