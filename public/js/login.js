async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#login-email').value.trim();
    const password = document.querySelector('#login-password').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            console.log("===========USER LOGGED IN===========");
            console.log(response);
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
    else {
        alert("Please fill out the form to log in!");
    }
}

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);