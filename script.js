
document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('upload-file');
    const caption = document.getElementById('upload-caption').value;
    const postsContainer = document.getElementById('posts');

    if (fileInput.files.length > 0 && caption) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const post = document.createElement('div');
            post.className = 'post';
            post.innerHTML = `
                <img src="\${event.target.result}" alt="Post Image">
                <p>\${caption}</p>
                <div class="actions">
                    <button>Like</button>
                    <button>Comment</button>
                </div>
            `;
            postsContainer.prepend(post);
        };
        reader.readAsDataURL(fileInput.files[0]);
        
        fileInput.value = '';
        document.getElementById('upload-caption').value = '';
    }
});
