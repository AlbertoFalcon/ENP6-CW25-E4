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

const formulario = document.getElementById("formPreferencias");
formulario.addEventListener("submit", function(event){
    event.preventDefault(); 
    let actual = getCookie("Actual");
    let usuarioActual = JSON.parse(decodeURIComponent(actual)).nombre;
    let datosCookie = getCookie(usuarioActual);
    let datos = JSON.parse(decodeURIComponent(datosCookie));
    
    let generos = [];
    let generosChecked = document.querySelectorAll("input[name='generos']:checked");
    for (let i = 0; i < generosChecked.length; i++) {
        generos.push(generosChecked[i].value);
    }
    let artistas = [];
    let artistasChecked = document.querySelectorAll("input[name='artistas']:checked");
    for (let i = 0; i < artistasChecked.length; i++) {
        artistas.push(artistasChecked[i].value);
    }

    datos.generos = generos;
    datos.artistas = artistas;
    document.cookie = usuarioActual + "=" + encodeURIComponent(JSON.stringify(datos));
    
    alert("Preferencias guardadas");
});

    