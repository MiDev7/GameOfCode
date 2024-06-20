function validateUserSignup()
{
    var userDetails =
    {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        email: document.getElementById("email").value,
        fullname: document.getElementById("fullname").value
    };
    validateEmail(userDetails.email);
    validateFullname(userDetails.fullname);
    validateUsername(userDetails.username);
    validatePassword(userDetails.password);
    console.log(userDetails);
}
function validateEmail(email)
{
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var emailErrorText = document.getElementById("emailError");
    if(email == "" || email == null)
    {
        emailErrorText.innerHTML = "Email address is required";
        return;
    }
    if (!emailPattern.test(email))
    {
        emailErrorText.innerHTML = "Invalid email address";
        return; 
    }
}
function validateFullname(fullname)
{
    var fullnamePattern = /^[a-zA-Z ]/;
    var fullnameErrorText = document.getElementById("fullnameError");
    if(fullname == "" || fullname == null)
    {
        fullnameErrorText.innerHTML = "Full name is required";
        return;
    }
    if (!fullnamePattern.test(fullname))
    {
        fullnameErrorText.innerHTML = "Fullname must only contain alphabets and spaces";
        return; 
    }
}
function validateUsername(username)
{
    var usernamePattern = /^[a-zA-Z0-9._-]{6,20}$/;
    var usernameErrorText = document.getElementById("usernameError");
    if(username == "" || username == null)
    {
        usernameErrorText.innerHTML = "Username is required";
        return;
    }
    if (!usernamePattern.test(username))
    {
        usernameErrorText.innerHTML = "Username must be between 6 and 20 characters";
        return; 
    }
}
function validatePassword(password)
{
    var upper_regex = /[A-Z]/;
    var lower_regex = /[a-z]/;
    var number_regex = /[0-9]/;
    var special_regex = /[!@#$%^&*()\-+={}[\]:;"'<>,.?\/|\\ ]/;
    var passwordErrorText = document.getElementById("passwordError");
    if (password === "")
    {
        passwordErrorText.innerHTML = ("Password cannot be empty");
        return;
    }
    if (password.length < 8)
    {
        passwordErrorText.innerHTML = ("Password has to be at least 8 characters");
    }
    if (!upper_regex.test(password))
    {
        passwordErrorText.innerHTML = ("Password needs to have 1 uppercase");
    }
    if (!lower_regex.test(password))
    {
        passwordErrorText.innerHTML = ("Password needs to have 1 lowercase");
    }
    if (!number_regex.test(password))
    {
        passwordErrorText.innerHTML = ("Password needs to have 1 number");
    }
    if (!special_regex.test(password))
    {
        passwordErrorText.innerHTML = ("Password needs to have 1 special character");
    }
}