const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const roleRoutes = require('./routes/roles');
const analyzeRoutes = require('./routes/analyze');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);       // POST /api/auth/login, POST /api/auth/register
app.use('/api/roles', roleRoutes);      // GET /api/roles
app.use('/api/analyze', analyzeRoutes); // POST /api/analyze

// Health check
app.get('/', (req, res) => {
    res.json({ message: 'Skill Gap Analyzer API is running.' });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB Atlas');
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1);
    });
