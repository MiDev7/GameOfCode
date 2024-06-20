var notyf = new Notyf();

document.addEventListener('DOMContentLoaded', (event) => {
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
            notyf.error({
                message: "Please fill out the form",
                duration: 2000,
                position: { x: "center", y: "top"}
            })
            return;
        }

        // Validation for email address using regular expression
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            notyf.error({
                message: "Please enter a valid email",
                duration: 2000,
                position: { x: "center", y: "top"}
            })
            return;
        }

        // Validation for password
        // Checking for character length
        if (password.length <= 7) {
            notyf.error({
                message: "Your password should be at least 8 characters long.",
                duration: 2000,
                position: { x: "center", y: "top"}
            })
            return;

        // Checking if password contains symbols
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            notyf.error({
                message: "Password must contain at least one special character.",
                duration: 2000,
                position: { x: "center", y: "top"}
            })
            return;

        // Checking if password contains numeric values
        } else if (!/\d/.test(password)) {
            notyf.error({
                message: "Password must contain at least one number",
                duration: 2000,
                position: { x: "center", y: "top"}
            })
            return;

        // Checking if password contains uppercase alphabets
        } else if (!/[A-Z]/.test(password)) {
            notyf.error({
                message: "Password must contain at least one capital letter",
                duration: 2000,
                position: { x: "center", y: "top"}
            })
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
            notyf.success({
                message: "Registration Successful, please proceed to login",
                duration: 2000,
                position: { x: "center", y: "top"}
            })
            window.location.href = "/static/pages/login.html"; 
        })
        .catch((error) => {
            console.error("Error:", error);
            notyf.error({
                message: "Failed to register user. Please try again",
                duration: 2000,
                position: { x: "center", y: "top"}
            })

        });
    }

    signup_button.onclick = registration;
    signup_button.addEventListener('click', registration);
});
