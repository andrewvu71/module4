const modeToggle = document.getElementById('mode-toggle');
modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
});


if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
}


if (document.getElementById('post-form')) {
    document.getElementById('post-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        const post = { title, content, date: new Date().toISOString() };

        let posts = localStorage.getItem('posts');
        posts = posts ? JSON.parse(posts) : [];
        posts.push(post);

        localStorage.setItem('posts', JSON.stringify(posts));
        alert('Post saved!');

        e.target.reset();
    });
}

if (document.getElementById('posts-list')) {
    const postsList = document.getElementById('posts-list');
    let posts = localStorage.getItem('posts');
    posts = posts ? JSON.parse(posts) : [];

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        const postTitle = document.createElement('h2');
        postTitle.textContent = post.title;

        const postContent = document.createElement('p');
        postContent.textContent = post.content;

        const postDate = document.createElement('small');
        postDate.textContent = `Posted on: ${new Date(post.date).toLocaleString()}`;

        postElement.appendChild(postTitle);
        postElement.appendChild(postContent);
        postElement.appendChild(postDate);

        postsList.appendChild(postElement);
    });
}
