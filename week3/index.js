// code for the initial slide show
let counter = 0;
let images = [];
const time = 3000;
images = [
    "images/1.png",
    "images/2.png",
    "images/3.jpeg",
    "images/4.jpeg",
    "images/5.jpeg",
    "images/6.jpeg",
    "images/7.jpeg",
    "images/8.jpeg"
];

function changeSource (){
    let slide = document.getElementsByName('slide')[0];
    slide.src = images[counter];
    counter = (counter + 1) % images.length;
};
setInterval(changeSource, time);
window.onload = function() {
    changeSource();
  };
  
// code for modal and registration form
document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById('myModal');
    var btn = document.getElementById('openModal');
    var span = document.getElementsByClassName('close')[0];
    
    btn.onclick = function() {
        modal.style.display = 'block';
    }
    
    span.onclick = function() {
        modal.style.display = 'none';
    }
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
    
    document.getElementById('registrationForm').addEventListener('submit', function(event) {
        event.preventDefault();
        validateUsername();
        validateEmail();
        validatePassword();
        validateConfirmPassword();
    });

    document.getElementById('username').addEventListener('blur', validateUsername);
    document.getElementById('email').addEventListener('blur', validateEmail);
    document.getElementById('password').addEventListener('blur', validatePassword);
    document.getElementById('confirmPassword').addEventListener('blur', validateConfirmPassword);
    
    function validateUsername() {
        var username = document.getElementById('username').value.trim();
        var errorElement = document.getElementById('usernameError');
        if (username === '') {
            errorElement.textContent = 'Username cannot be empty';
            document.getElementById('username').classList.add('error');
        } else {
            errorElement.textContent = '';
            document.getElementById('username').classList.remove('error');
            document.getElementById('username').classList.add('success');
        }
    }
    
    function validateEmail() {
        var email = document.getElementById('email').value.trim();
        var errorElement = document.getElementById('emailError');
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            errorElement.textContent = 'Email cannot be empty';
            document.getElementById('email').classList.add('error');
        } else if (!emailRegex.test(email)) {
            errorElement.textContent = 'Invalid email format';
            document.getElementById('email').classList.add('error');
        } else {
            errorElement.textContent = '';
            document.getElementById('email').classList.remove('error');
            document.getElementById('email').classList.add('success');
        }
    }
    
    function validatePassword() {
        var password = document.getElementById('password').value;
        var errorElement = document.getElementById('passwordError');
        if (password.length < 8) {
            errorElement.textContent = 'Password must be at least 8 characters long';
            document.getElementById('password').classList.add('error');
        } else {
            errorElement.textContent = '';
            document.getElementById('password').classList.remove('error');
            document.getElementById('password').classList.add('success');
        }
    }
    
    function validateConfirmPassword() {
        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('confirmPassword').value;
        var errorElement = document.getElementById('confirmPasswordError');
        if (confirmPassword !== password) {
            errorElement.textContent = 'Passwords do not match';
            document.getElementById('confirmPassword').classList.add('error');
        } else {
            errorElement.textContent = '';
            document.getElementById('confirmPassword').classList.remove('error');
            document.getElementById('confirmPassword').classList.add('success');
        }
    }
});
