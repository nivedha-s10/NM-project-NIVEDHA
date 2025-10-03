const Post = require('../models/postModel'); 

// Function to handle POST /api/posts (CREATE operation)
exports.createPost = async (req, res) => {
    // Hardcoded ID for MVP, would be authenticated in a full application
    const authorId = 'MVP_Test_User'; 
    const { title, content } = req.body;

    try {
        // Use the Mongoose Model to create and save a new document to MongoDB
        const newPost = await Post.create({
            title,
            content,
            authorId 
        });

        // Respond with success status (201 Created) and the new post data
        res.status(201).json({ 
            message: "Post created successfully.",
            post: newPost
        });
    } catch (error) {
        // Handle database errors (e.g., failed validation, unique constraint violation)
        res.status(400).json({ 
            message: error.code === 11000 ? "A post with this title already exists." : error.message
        });
    }
};

// Function to handle GET /api/posts (READ operation)
exports.getAllPosts = async (req, res) => {
    try {
        // Use the Mongoose Model to find all documents and sort by newest first
        const posts = await Post.find().sort({ createdAt: -1 }); 
        
        // Respond with success status (200 OK) and the array of posts
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch posts.", error: error.message });
    }
};