function commentFormHandler(event) {
    event.preventDefault();

    const postId = window.location.pathname.toString().split('/')[2];
    const commentText = document.querySelector('#comment-text').value.trim();

    if (commentText) {
        fetch(`/api/comments/${postId}`, {
            method: 'POST',
            body: JSON.stringify({
                text: commentText
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
        });
    } else {
        alert("You must type in the comment field to leave a comment.");
    }
};

document.querySelector('#add-comment-form').addEventListener('submit', commentFormHandler);