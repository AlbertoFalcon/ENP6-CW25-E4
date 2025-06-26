let input_nombre = document.getElementById("usuario");
let input_password = document.getElementById("contraseña");
let input_email = document.getElementById("email");
const form = document.getElementById("form-registro");
const terminos = document.getElementById("terminos");
const errorPassword = document.getElementById("errorContraseña");
const errorUsuario = document.getElementById("errorUsuario");

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

form.addEventListener("submit", function(event){
  event.preventDefault();
  let nombreCookie = input_nombre.value.trim();
  if (getCookie(nombreCookie)) {
    errorUsuario.textContent = "Ese nombre de usuario ya existe";
    return;
  }
  if (input_password.value.length < 5){
    console.log("Contraseña inválida");
    errorPassword.textContent = "La contraseña debe contener mínimo 5 caracteres";
    return;
  }
  let datos = {
    nombre: nombreCookie,
    password: input_password.value.trim(),
    email: input_email.value.trim(),
    generos:[],
    artistas:[],
    canciones:[]
  };
  let valorCookie = encodeURIComponent(JSON.stringify(datos));
  document.cookie = `${nombreCookie}=${valorCookie}; max-age=3600`;
  alert("Usuario registrado con éxito");
});
