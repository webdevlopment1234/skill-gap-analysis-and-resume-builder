// Seed script to populate the Roles collection in MongoDB
// Run: node seed.js

const mongoose = require('mongoose');
require('dotenv').config();

const Role = require('./models/Role');

const roles = [
    {
        roleName: 'Full Stack Developer',
        requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB']
    },
    {
        roleName: 'Data Scientist',
        requiredSkills: ['Python', 'SQL', 'Statistics', 'Machine Learning', 'TensorFlow', 'Pandas']
    },
    {
        roleName: 'Mobile Developer',
        requiredSkills: ['JavaScript', 'React Native', 'Redux', 'REST APIs', 'Git', 'Firebase']
    }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB Atlas');

        // Clear existing roles
        await Role.deleteMany({});
        console.log('🗑  Cleared existing roles');

        // Insert new roles
        await Role.insertMany(roles);
        console.log('✅ Seeded 3 roles:');
        roles.forEach(r => console.log(`   • ${r.roleName} (${r.requiredSkills.length} skills)`));

        await mongoose.disconnect();
        console.log('✅ Done. Database seeded successfully.');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seed error:', err.message);
        process.exit(1);
    }
}

seed();
