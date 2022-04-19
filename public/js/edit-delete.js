function editBtnHandler(event) {
    event.preventDefault();

    const postId = window.location.pathname.toString().split('/')[2];

    document.location.replace(`/dashboard/edit/${postId}`);
};

function deleteBtnHandler(event) {
    event.preventDefault();

    const postId = window.location.pathname.toString().split('/')[2];

    let confirmDelete = confirm("Are you sure you want to delete this post?");

    if (confirmDelete) {
        fetch(`/api/posts/${postId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                alert(response.statusText);
            }
        })
    }
};

document.querySelector('#edit-post').addEventListener('click', editBtnHandler);
document.querySelector('#delete-post').addEventListener('click', deleteBtnHandler);