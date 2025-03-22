const btnLogout = document.getElementById("btnLogout");
console.log(btnLogout);
btnLogout.addEventListener("click", () =>{
    fetch('http://localhost:3000/logout', {
        method : "POST",
        headers: {
        "Content-Type": "application/json"
        }
    }).then(res =>{
        console.log(res);
        window.location.href = "/";
    });
})