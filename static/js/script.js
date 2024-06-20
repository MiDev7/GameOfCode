console.log('p travail');

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('p travail 2');

    const signup_button = document.getElementById("registration_button");

    if (!signup_button) {
        console.error("Signup button not found");
        return;
    }


    function registration() {
        const data = {
            email: document.getElementById("email").value,
            fullname: document.getElementById("fullname").value,
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
        }

        const email = document.getElementById("email").value;
        const fullname = document.getElementById("fullname").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Validation for all entries to check if they have been filled out
        if (!email || !fullname || !username || !password) {
            console.log("Please fill out the form");
            return;
        }

        // Validation for email address using regular expression
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            console.log("Please enter a valid email address")
            return;
        }

        // Validation for password
        // Checking for character length
        if (password.length <= 7) {
            console.log("Your password should be at least 8 characters long.");
            return;

        // Checking if password contains symbols
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            console.log("Password must contain at least one special character.");
            return;

        // Checking if password contains numeric values
        } else if (!/\d/.test(password)) {
            console.log("Password must contain at least one number");
            return;

        // Checking if password contains uppercase alphabets
        } else if (!/[A-Z]/.test(password)) {
            console.log("Password must contain at least one capital letter");
            return;
        }

        fetch("http://localhost:3000/signup", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success!', data);
            console.log("Registration Successful, please proceed to login")
        })
        .catch((error) => {
            console.error("Error:", error);
            console.log("Failed to register user. Please try again")

        });
    }

    signup_button.onclick = registration;
    signup_button.addEventListener('click', registration);
});
