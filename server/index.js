require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: '*', // Allow all origins for now to prevent blocking
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// DB Connection Check Middleware
app.use(async (req, res, next) => {
    // Skip DB check for preflight requests
    if (req.method === 'OPTIONS') return next();

    if (mongoose.connection.readyState === 1) {
        return next();
    }

    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined');
        }
        // Force connect if not connected
        await mongoose.connect(process.env.MONGO_URI);
        next();
    } catch (err) {
        console.error('DB Connection Error:', err);
        res.status(500).json({
            message: 'Database connection failed',
            error: err.message,
            hint: 'Check MONGO_URI and MongoDB Atlas IP Whitelist (0.0.0.0/0)'
        });
    }
});

// Routes
const questionRoutes = require('./routes/questions');
const interviewRoutes = require('./routes/interviews');

app.use('/api/questions', questionRoutes);
app.use('/api/interviews', interviewRoutes);

app.get('/', (req, res) => {
    res.send('Mockify API is running');
});

// Database Connection
// Database Connection
const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            return;
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB Connection Error:', err.message);
        // Do not exit process in serverless environment
    }
};

// Connect to DB immediately
connectDB();

// Start Server (only if run directly)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
