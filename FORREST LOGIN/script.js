const signupbutton = document.getElementById('signup-btn')
const loginbutton = document.getElementById('login-btn')
const signupform = document.getElementById('signup-box')
const loginform = document.getElementById('loginbox')

signupbutton.addEventListener('click',function(){
    loginform.style.display="none";
    signupform.style.display="block";

})

loginbutton.addEventListener('click',function(){
    loginform.style.display="block";
    signupform.style.display="none";
})

signupbutton.addEventListener('click', function(e) {
    e.preventDefault();  // Add this line
    loginform.style.display = "none";
    signupform.style.display = "block";
});

loginbutton.addEventListener('click', function(e) {
    e.preventDefault();  // Add this line
    loginform.style.display = "block";
    signupform.style.display = "none";
});

// Footer link handlers
document.querySelectorAll('a[href="#signup-box"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        loginform.style.display = "none";
        signupform.style.display = "block";
    });
});

document.querySelectorAll('a[href="#loginbox"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        loginform.style.display = "block";
        signupform.style.display = "none";
    });
});
