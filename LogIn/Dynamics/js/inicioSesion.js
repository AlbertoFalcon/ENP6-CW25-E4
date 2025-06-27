const formLogin = document.getElementById("login");
const usuario = document.getElementById("usuario");
const password = document.getElementById("contraseña");
const errorUsuario = document.getElementById("errorUsuario");
const errorPassword = document.getElementById("errorContraseña");

function getCookie(nombre) {
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++){
        let galleta = cookies[i].trim();
        if(galleta.indexOf(nombre + "=" ) === 0){
            return galleta.slice(nombre.length + 1);
        }
    }
    return null;
}

formLogin.addEventListener("submit", function (event) {
    event.preventDefault();
    let nombreInput = usuario.value.trim();
    let passwordInput = password.value.trim();
    let datosCookie = getCookie(nombreInput);

    if (datosCookie) {
        let datos = JSON.parse(decodeURIComponent(datosCookie));
        
        if (datos.password === passwordInput) {
            let actual = {
                nombre: datos.nombre
            };
            document.cookie = `Actual=${encodeURIComponent(JSON.stringify(actual))}; max-age=3600`;

            alert("Inicio de sesión exitoso");

            window.location.href = "../Templates/Preferencias.html";
        } else {
            errorPassword.textContent = "Contraseña incorrecta";
            errorUsuario.textContent = "";
        }
    } else {
        errorUsuario.textContent = "El usuario no existe";
        errorPassword.textContent = "";
    }
});