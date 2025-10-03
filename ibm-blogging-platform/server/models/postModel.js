const mongoose = require('mongoose');

// Define the structure of a blog post document
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'], // Data validation: must exist
        trim: true,
        unique: true // Data constraint: title must be unique
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    authorId: { // A placeholder for the user who created the post
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically sets the creation date
    }
});

// Export the Mongoose model named 'Post'
module.exports = mongoose.model('Post', postSchema);