const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Define the route for GET requests to the root path of this router (which is /api/posts)
// Runs the getAllPosts function from the controller
router.get('/', postController.getAllPosts);

// Define the route for POST requests to the root path
// Runs the createPost function from the controller
router.post('/', postController.createPost); 

module.exports = router;