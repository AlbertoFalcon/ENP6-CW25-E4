/* En este archivo se deben validar los campos del registro, además de no permitir crear otro
 * usuario con un nombre que ya exista. Una vez validados los campos se debe crear una cookie
 * usando un diccionario/JSON que incluya los valores de cada campo. De la forma:
 *     let datos = {
          nombre: usuario.value.trim(),
          password: password.value.trim(),
          email: email.value.trim()
        }
*/
let input_nombre = document.getElementById("usuario");
let input_password = document.getElementById("contraseña");
let input_email = document.getElementById("email");
const form = document.getElementById("form-registro");
const terminos = document.getElementById("terminos");

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
    alert("¡Ese nombre de usuario ya existe!");
    return;
  }
  let datos = {
    nombre: nombreCookie,
    password: input_password.value.trim(),
    email: input_email.value.trim()
  };
  let valorCookie = encodeURIComponent(JSON.stringify(datos));
  document.cookie = `${nombreCookie}=${valorCookie}; max-age=3600`;
  alert("Usuario registrado con éxito");
});
