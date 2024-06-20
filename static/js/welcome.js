document.addEventListener('DOMContentLoaded', function() {
    var username = sessionStorage.getItem('username');

    if (username) {
        var welcomeText = document.getElementsByClassName('welcome-text')[0];
        welcomeText.innerHTML = `Welcome to Code of Mystery, ${username}!`;
    } else {
        console.log('Username not found in sessionStorage');
    }
});
