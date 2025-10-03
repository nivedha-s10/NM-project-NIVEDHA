const POSTS_API_URL = 'http://localhost:5000/api/posts'; // Target the API endpoint

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Read operation when the page loads
    fetchAndRenderPosts();
    
    // 2. Attach the function to handle form submission
    document.getElementById('post-form').addEventListener('submit', handlePostSubmission);
});

// Function to handle form submission (CREATE POST: POST /api/posts)
async function handlePostSubmission(event) {
    event.preventDefault(); // Stop the default form reload

    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;

    try {
        const response = await fetch(POSTS_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message); // Success message
            document.getElementById('post-form').reset(); // Clear form
            fetchAndRenderPosts(); // Refresh post list
        } else {
            // Display server-side error message (e.g., "Title is required", "Title already exists")
            alert(`Submission Error: ${result.message}`);
        }
    } catch (error) {
        console.error('Submission Error:', error);
        alert('Network Error: Failed to connect to the server. Is the backend running?');
    }
}

// Function to fetch and display posts (READ POSTS: GET /api/posts)
async function fetchAndRenderPosts() {
    const postList = document.getElementById('post-list');
    postList.innerHTML = 'Fetching posts...'; 

    try {
        const response = await fetch(POSTS_API_URL);
        const posts = await response.json();

        postList.innerHTML = ''; // Clear status message

        if (posts.length === 0) {
            postList.innerHTML = '<p>No posts published yet.</p>';
            return;
        }

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.style.border = '1px solid #ccc';
            postElement.style.padding = '15px';
            postElement.style.margin = '10px 0';
            
            postElement.innerHTML = `
                <h3 style="color: #0056b3;">${post.title}</h3>
                <p>${post.content}</p>
                <small>Author: ${post.authorId} | Published: ${new Date(post.createdAt).toLocaleDateString()}</small>
            `;
            postList.appendChild(postElement);
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        postList.innerHTML = '<p style="color: red;">Error loading posts. Check server connection.</p>';
    }
}