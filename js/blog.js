// Simple Markdown parser for basic formatting
function parseMarkdown(markdown) {
    let html = markdown;
    
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Bold
    html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
    
    // Italic
    html = html.replace(/\*(.*)\*/gim, '<em>$1</em>');
    
    // Links
    html = html.replace(/\[([^\]]*)\]\(([^\)]*)\)/gim, '<a href="$2">$1</a>');
    
    // Lists
    html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/gims, '<ul>$1</ul>');
    
    // Paragraphs
    html = html.replace(/\n\n/gim, '</p><p>');
    html = '<p>' + html + '</p>';
    
    // Clean up empty paragraphs and fix list formatting
    html = html.replace(/<p><\/p>/gim, '');
    html = html.replace(/<p>(<ul>.*<\/ul>)<\/p>/gims, '$1');
    html = html.replace(/<p>(<h[1-6]>.*<\/h[1-6]>)<\/p>/gims, '$1');
    
    return html;
}

// Load posts from JSON
async function loadPosts() {
    try {
        const response = await fetch('posts.json');
        const data = await response.json();
        return data.posts;
    } catch (error) {
        console.error('Error loading posts:', error);
        return [];
    }
}

// Load a specific post
async function loadPost(filename) {
    try {
        const response = await fetch(`markdown-posts/${filename}`);
        const markdown = await response.text();
        return parseMarkdown(markdown);
    } catch (error) {
        console.error('Error loading post:', error);
        return '<p>Error loading post content.</p>';
    }
}

// Display posts on homepage
async function displayPosts() {
    const posts = await loadPosts();
    const postsContainer = document.getElementById('posts-container');
    
    if (!postsContainer) return;
    
    postsContainer.innerHTML = '';
    
    posts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.className = 'post';
        postElement.innerHTML = `
            <h3><a href="post.html?id=${post.id}">${post.title}</a></h3>
            <p class="post-meta">Posted on <time datetime="${post.date}">${formatDate(post.date)}</time></p>
            <p>${post.excerpt}</p>
            <a href="post.html?id=${post.id}" class="read-more">Read more</a>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Display single post
async function displaySinglePost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    
    if (!postId) {
        document.getElementById('post-content').innerHTML = '<p>Post not found.</p>';
        return;
    }
    
    const posts = await loadPosts();
    const post = posts.find(p => p.id === postId);
    
    if (!post) {
        document.getElementById('post-content').innerHTML = '<p>Post not found.</p>';
        return;
    }
    
    const content = await loadPost(post.filename);
    
    document.getElementById('post-title').textContent = post.title;
    document.getElementById('post-date').textContent = formatDate(post.date);
    document.getElementById('post-date').setAttribute('datetime', post.date);
    document.getElementById('post-content').innerHTML = content;
    document.title = `${post.title} - CruxSux`;
}

// Format date for display
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Initialize based on page
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('posts-container')) {
        displayPosts();
    } else if (document.getElementById('post-content')) {
        displaySinglePost();
    }
});
