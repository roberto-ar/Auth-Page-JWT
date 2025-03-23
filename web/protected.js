
const btnLogout = document.getElementById("btnLogout");
const title = document.querySelector(".title");
const message = document.getElementById("protected-messages");

fetch('http://localhost:3000/data')
.then(res => res.json())
.then(data =>{
    title.textContent = `Hola bienvenido ${data.username}`;
})

btnLogout.addEventListener("click", () =>{
    fetch('http://localhost:3000/logout', {
        method : "POST",
        headers: {
        "Content-Type": "application/json"
        }
    }).then(res =>{
        if(res.ok){
            message.textContent = "Cerrando sesión... con exito"
            setTimeout(()=>{
                window.location.href = "/";
                message.textContent = "";
            },2000);
        }
    });
})
