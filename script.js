let users = JSON.parse(localStorage.getItem('users')) || [];
let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || null;

document.getElementById('register-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    const user = { name, email, password };
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful! Please log in.');
    window.location.href = 'login.html';
});

document.getElementById('login-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        loggedInUser = user;
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        alert('Login successful!');
        window.location.href = 'index.html';
    } else {
        alert('Invalid email or password!');
    }
});

if (loggedInUser) {
    document.getElementById('profile-name').textContent = loggedInUser.name;
    document.getElementById('profile-email').textContent = loggedInUser.email;
}

document.getElementById('upload-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('upload-file');
    const caption = document.getElementById('upload-caption').value;
    const postsContainer = document.getElementById('posts');

    if (fileInput.files.length > 0 && caption) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const post = document.createElement('div');
            post.className = 'post col-md-4';
            post.innerHTML = 
                <div class="card">
                    <img src="" class="card-img-top" alt="Post Image">
                    <div class="card-body">
                        <p class="card-text"></p>
                        <div class="actions">
                            <button class="btn btn-outline-primary btn-sm" onclick="likePost(this)">Like</button>
                            <button class="btn btn-outline-secondary btn-sm" onclick="commentPost(this)">Comment</button>
                        </div>
                    </div>
                </div>
            ;
            postsContainer.prepend(post);
        };
        reader.readAsDataURL(fileInput.files[0]);
        
        fileInput.value = '';
        document.getElementById('upload-caption').value = '';
    }
});

function likePost(button) {
    const likes = button.textContent === 'Like' ? 1 : parseInt(button.textContent.split(' ')[1]) + 1;
    button.textContent = Like ;
}

function commentPost(button) {
    const comment = prompt('Write a comment:');
    if (comment) {
        const commentElement = document.createElement('p');
        commentElement.textContent = comment;
        button.parentElement.appendChild(commentElement);
    }
}
