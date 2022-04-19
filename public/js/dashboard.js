function createBtnHandler(event) {
    event.preventDefault();
    document.location.replace('/dashboard/create/');
};

document.querySelector('#create-post').addEventListener('click', createBtnHandler);