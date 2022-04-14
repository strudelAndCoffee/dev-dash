async function signupFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#signup-email').value.trim();
    const username = document.querySelector('#signup-username').value.trim();
    const password = document.querySelector('#signup-password').value.trim();

    if (email && username && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                email,
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            console.log("=========USER CREATED============");
            console.log(response);
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
    else {
        alert("Please fill out the whole form before signing up!");
    }
};

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);