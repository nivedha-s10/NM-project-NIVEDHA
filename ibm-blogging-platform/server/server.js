// 1. Core Modules & Configuration
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// Load environment variables from .env file FIRST
require('dotenv').config(); 

const app = express();

// 2. Middleware
app.use(express.json()); // Allows the app to read JSON data from POST/PUT requests
app.use(cors()); // Allows your frontend to talk to this backend

// 3. Database Connection
// Attempt to connect to MongoDB using the URI from your .env file
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected successfully');
        
        // 4. Start Server AFTER successful database connection
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    })
    .catch(err => {
        // If connection fails, log the specific error and exit the server process
        console.error('SERVER FAILED TO START due to MongoDB connection error:');
        console.error('Please check your MONGO_URI, username, password, and Network Access settings in MongoDB Atlas.');
        console.error('Error Details:', err.message);
        process.exit(1); 
    });


// 5. Routes Definition
// Import and use your post routes here
const postRoutes = require('./routes/postRoutes');
app.use('/api/posts', postRoutes);

// Optional: A simple root route to confirm the server is responsive
app.get('/', (req, res) => {
    res.send('Blogging Platform API is running!');
});