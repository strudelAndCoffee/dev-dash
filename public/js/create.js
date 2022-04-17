async function createPostHandler(event) {
    event.preventDefault();

    const newPostTitle = document.querySelector("#new-post-title").value.trim();
    const newPostText = document.querySelector("#new-post-text").value.trim();

    if (newPostTitle && newPostText) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: newPostTitle,
                text: newPostText
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            console.log(response);
            document.location.replace('/dashboard');
        }
    }
};

document.querySelector('#new-post').addEventListener('submit', createPostHandler);