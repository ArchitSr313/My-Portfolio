// Fetch Medium blogs dynamically
async function fetchMediumBlogs() {
    const username = 'iamarchit.sr'; // Replace with your Medium username
    const mediumUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`;

    try {
        const response = await fetch(mediumUrl);
        const data = await response.json();

        if (data.items) {
            const articles = data.items;
            const blogContainer = document.getElementById('medium-articles');

            blogContainer.innerHTML = ''; // Clear previous content

            articles.slice(0, 5).forEach(article => {
                const articleElement = document.createElement('div');
                articleElement.classList.add('blog-card');

                articleElement.innerHTML = `
                    <a href="${article.link}" target="_blank" class="blog-title">${article.title}</a>
                    <p class="blog-desc">${article.description.substring(0, 100)}...</p>
                    <small class="blog-date">Published on: ${new Date(article.pubDate).toDateString()}</small>
                `;

                blogContainer.appendChild(articleElement);
            });
        }
    } catch (error) {
        console.error('Error fetching Medium articles:', error);
        document.getElementById('medium-articles').innerHTML = '<p class="error-msg">Failed to load articles. Check your internet connection.</p>';
    }
}

fetchMediumBlogs();
