var notyf = new Notyf();

document.addEventListener('DOMContentLoaded', (event) => {
    const login_button = document.getElementById("login_button");

    if (!login_button) {
        console.error("login button not found");
        return;
    }


    function login() {
        const data = {
            username: document.getElementById("Username").value,
            password: document.getElementById("Password").value,
        }

        const username = document.getElementById("Username").value;
        const password = document.getElementById("Password").value;

        // Validation for all entries to check if they have been filled out
        if (!username || !password) {
            notyf.error({
                message: "Please fill out the form",
                duration: 2000,
                position: { x: "center", y: "top"}
            })
            return;
        }

        //sending and receiving data from server with the endpoint "/login"
        fetch("http://localhost:3000/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            //if username or password is incorrect message will be displayed
            if (data.error) {
                notyf.error({
                    message: "Credentials are incorrect. Please try again",
                    duration: 2000,
                    position: { x: "center", y: "top"}
                })
                return;
            //if correct, success message will be displayed
            } else {
                console.log('Success!', data);
                notyf.success({
                    message: "Login Successful",
                    duration: 2000,
                    position: { x: "center", y: "top"}
                })
                return;
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            notyf.error({
                message: "Failed to login",
                duration: 2000,
                position: { x: "center", y: "top"}
            })
            return;
        });
    }

    login_button.onclick = login;
    login_button.addEventListener('click', login);
});
