const botonCerrar = document.getElementById("cerrar-sesion");

botonCerrar.addEventListener("click", function () {
    document.cookie = "Actual=; max-age=-1";
    window.location.href = "../Templates/login.html";
})