const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");

const loginPage = document.getElementById("login-page");
const registerPage = document.getElementById("register-page");
const onePage = document.getElementById("one-page");
const btnLogin = document.getElementById("btnLogin");
const btnRegister = document.getElementById("btnRegister");

btnLogin.addEventListener("click", () =>{
    loginPage.style.display = "block";
    onePage.style.display = "none";
})

btnRegister.addEventListener("click", () =>{
    registerPage.style.display = "block";
    onePage.style.display = "none";
})

document.addEventListener("click", (e)=>{
    if(e.target.classList.contains("back-btn")){
        e.target.closest("div").style.display = "none";
        onePage.style.display = "block";
    }
})

registerForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    const messageSpan = document.querySelector(".messages-register");
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;
    const confirm_password = document.getElementById("confirm-password").value;

    if(password != confirm_password){
        messageSpan.textContent = "Las contraseñas no coinciden";
        setTimeout(()=>{
            messageSpan.textContent = "";
        }, 3000);
    }
    fetch('http://localhost:3000/register', {
        method : "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({username, password})
    }).then(res =>{
        if(res.ok){
            messageSpan.textContent = "Te registraste exitosamente";
            setTimeout(()=>{
                messageSpan.textContent = "";
                window.location.href = "/protected";
            },2000);
        }
        else{
            messageSpan.textContent = "Error al registrarse";
        }
    });

});

loginForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    const messageSpan = document.querySelector(".messages-login");
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    fetch('http://localhost:3000/login', {
        method : "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({username, password})
    }).then(res =>{
        if(res.ok){
            messageSpan.textContent = "Iniciando sesión exitosamente";
            setTimeout(()=>{
                messageSpan.textContent = "";
                window.location.href = "/protected";
            },2000);
        }
        else{
            messageSpan.textContent = "Error al iniciar sesión";
        }
    });

})