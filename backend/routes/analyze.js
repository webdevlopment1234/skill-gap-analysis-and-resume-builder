const express = require('express');
const Role = require('../models/Role');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// POST /api/analyze — Compare user skills against role requirements
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { roleId, userSkills } = req.body;

        // Validate input
        if (!roleId || !userSkills || !Array.isArray(userSkills)) {
            return res.status(400).json({ message: 'roleId and userSkills (array) are required.' });
        }

        // Find the role
        const role = await Role.findById(roleId);
        if (!role) {
            return res.status(404).json({ message: 'Role not found.' });
        }

        const requiredSkills = role.requiredSkills;
        const totalRequired = requiredSkills.length;

        // Simple matching — direct comparison, no weighting
        const matchedSkills = userSkills.filter(skill =>
            requiredSkills.includes(skill)
        );
        const missingSkills = requiredSkills.filter(skill =>
            !userSkills.includes(skill)
        );

        const matchPercentage = totalRequired > 0
            ? Math.round((matchedSkills.length / totalRequired) * 100)
            : 0;

        res.json({
            roleName: role.roleName,
            totalRequired,
            matched: matchedSkills.length,
            matchPercentage,
            matchedSkills,
            missingSkills
        });
    } catch (err) {
        console.error('Analyze error:', err);
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;
