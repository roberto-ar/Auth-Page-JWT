const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const alertBox = document.getElementById("alert-box");
const alertMessage = document.getElementById("alert-message");

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

    const warning = validate(password, username);
    if(warning.length != 0){
        showAlert(warning, "error");
        return;
    }
    if(password != confirm_password){
        showAlert("Las contraseñas no coinciden", "error");
        return;
    }
    fetch('http://localhost:3000/register', {
        method : "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({username, password})
    }).then(res =>{
        if(res.ok){
            showAlert("Te registraste exitosamente...", "success");
            setTimeout(()=>{
                window.location.href = "/protected";
            },2000);
        }
        else{
            showAlert("Error al registrarse", "error");
        }
    });

});

loginForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const warning = validate(password, username);
    if(warning.length != 0){
        showAlert(warning, "error");
        return
    }

    fetch('http://localhost:3000/login', {
        method : "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({username, password})
    }).then(res =>{
        if(res.ok){
            showAlert("Iniciaste sesión exitosamente", "success");
            setTimeout(()=>{
                window.location.href = "/protected";
            },2000);
        }
        else{
            showAlert("Error al iniciar sesión", "error");
        }
    });
})

function validate(password, username){
    if(username.length < 3){
        return "Usa minimo 3 caracteres";
    }
    if(password.length < 6){
        return "Password contiene minimo 6 caracteres!";
    }
    return "";
}

function showAlert(message, type = "success") {
    const alertBox = document.getElementById("alert-box");
    const alertMessage = document.getElementById("alert-message");

    alertMessage.textContent = message;
    alertBox.className = `alert show ${type}`;

    setTimeout(() => {
        alertBox.classList.add("hidden");
    }, 2000); 
}
