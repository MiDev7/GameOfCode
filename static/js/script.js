//validate user login credentaials
function VData() {
    //get values frm input data fields
    let Username = document.getElementById('Username').value;
    let Password = document.getElementById('Password').value;

    // Check if the required fields are not empty
    if (Username === '' || Password === '') {
        alert("Please fill in all the fields.");
        return;
    }

    //retrieve user records from local storage
    let userRecords = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = userRecords.find(user => user.Username== Username && user.Password === Password);

    if (foundUser) {

        if (foundUser.Password === Password){
        // Login successful
        alert("Login successful!");

        window.location.href = "../index.html";
    }else {
        // Invalid login
        alert("Invalid password. Please try again.");
    }
    } else {
        alert("Wrong Password. Please try again")
    }

   
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

    //validation for all entries to check if they have been filled out
    if (!email || !fullname || !username || !password) {
        notyf.error({
            message: "Please fill out the form",
            duration: 2000,
            position: { x: "center", y: "top"}
        })
        return;
    }

        /*validation  for email address using regular expression
    checking if email is in the correct format */
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        notyf.error({
            message: "Please enter a valid email address",
            duration: 2000,
            position: { x: "center", y: "top"}
        })
        return;
    }

    //validation for password
    //checking for character length
    if (password.length <= 7) {
        notyf.error({
            message: "Your password should be at least 8 characters long.",
            duration: 2000,
            position: { x: "center", y: "top"}
        })
        return;

    //checking if password contains symbols in password
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        notyf.error({
            message: "Password must contain at least one special character.",
            duration: 2000,
            position: { x: "center", y: "top"}
        })
        return;

    //checking if password contains numeric values
    } else if (!/\d/.test(password)) {
        notyf.error({
            message: "Password must contain at least one number",
            duration: 2000,
            position: { x: "center", y: "top"}
        })
        return;

    //checking if password contains uppercase alphabets
    } else if (!/[A-Z]/.test(password)) {
        notyf.error({
            message: "Password must contain at least one capital letter",
            duration: 2000,
            position: { x:"center", y: "top"}
        })
        return;
    }
}

