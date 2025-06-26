/* Este archivo se debe encargar de cerrar la sesión del usuario activo.*/ 
const botonCerrar = document.getElementById("cerrar-sesion");

botonCerrar.addEventListener("click", function () {
    document.cookie = "Actual=; max-age=-1";
    alert("Sesión cerrada");
    window.location.href = "../Templates/inicio.html";
})