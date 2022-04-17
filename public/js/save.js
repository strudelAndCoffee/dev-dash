const postId = window.location.pathname.toString().split('/')[3];

function getPostData() {

    fetch(`/api/posts/${postId}`)
    .then(response => response.json())
    .then(postData => {
        fillPostFields(postData);
    });
};

function fillPostFields(post) {
    const currentTitle = document.querySelector('#post-title');
    const currentText = document.querySelector('#post-text');

    currentTitle.value = post.title;
    currentText.value = post.text;
};

function saveUpdatedPost(event) {
    event.preventDefault();
    
    const newTitle = document.querySelector('#post-title').value.trim();
    const newText = document.querySelector('#post-text').value.trim();

    fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
            title: newTitle,
            text: newText
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            document.location.replace(`/post/${postId}`);
        } else {
            alert(response.statusText);
        }
    })
};

document.querySelector('#save-post-btn').addEventListener('click', saveUpdatedPost);

getPostData();