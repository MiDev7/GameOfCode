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