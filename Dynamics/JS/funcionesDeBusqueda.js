//baseDeDatos.albumes
function obtenerCancionesDeArtistaPorId(idArtista){
    let cancionesFiltradas=[];
    
    for(let i=0; i<baseDatosJSON.canciones.length;i++ )
    {
        let cancionAct= baseDatosJSON.canciones[i];
        if(cancionAct.id_artista === idArtista){
            cancionesFiltradas.push(cancionAct);
        }
    }
    return cancionesFiltradas;
    
    // Esto es un arreglo de objetos
    // Declarar un arreglo [] al que le harás push los objetos cancion cuyo artista coincida con 
    //el parametro
    //return 
}


function obtenerAlbumesDeArtistaPorId(id_del_artista){
    let albumsFiltrados=[];
    
    for(let i=0; i<baseDatosJSON.album.length;i++ )
    {
        let albumAct= baseDatosJSON.album[i];
        if(albumAct.id_artista === id_del_artista){
            albumsFiltrados.push(albumAct);
        }
    }
    return albumsFiltrados;
}

function obtenerCancionesDeAlbum(id_del_album){
    let cancionesFiltradas=[];
    
    for(let i=0; i<baseDatosJSON.canciones.length;i++ )
    {
        let cancionAct= baseDatosJSON.canciones[i];
        if(cancionAct.id_album === id_del_album){
            cancionesFiltradas.push(cancionAct);
        }
    }
    return cancionesFiltradas;
    // return un arreglo con objetos Cancion con las canciones del album

}

function obtenerCancionesAlbumesArtistasPorString(valor_input){
    //Devolver un objeto que se vea así
    let resultados={
        canciones:[],
        artistas:[],
        albumes:[],
    };
    let valorInput = valor_input.toLowerCase(valor_input.trim());

    //buscacion canciones
    for(let i=0; i < baseDatosJSON.canciones.length ;i++)
    {
        const cancionAct=baseDatosJSON.canciones[i];
        //convertir todo en minusculas
        let nombreCancion = cancionAct.nombre.toLowerCase();
        let artistaCancion = cancionAct.artista.toLowerCase();
        let albumCancion = cancionAct.album.toLowerCase();

        if(nombreCancion.indexOf(valorInput) !== -1 || artistaCancion.indexOf(valorInput) !== -1 || albumCancion.indexOf(valorInput) !== -1)
        {
            resultados.canciones.push(cancionAct);
        }
    }
    //busqueda en Artistas

    for(let i=0; i< baseDatosJSON.artistas.length;i++){

        const artistaAct = baseDatosJSON.artistas[i];
        let nombreArt= artistaAct.nombre.toLowerCase();
        if(nombreArt.indexOf(valorInput) !== -1){
            resultados.artistas.push(artistaAct);
        }
    }

    // buscar en albumes

    for(let i=0;i<baseDatosJSON.album.length;i++)
    {
        const albumActual = baseDatosJSON.album[i];
        let nombreAlbumActual = albumActual.nombre.toLocaleLowerCase();
        if(nombreAlbumActual.indexOf(valorInput) !== -1){
            resultados.albumes.push(albumActual);
        }
    }

    return resultados;

}

// Ejemplo de uso: 
/*
    let arreglo_canciones = obtenerCancionesDeAlbum(8)
    arreglo_canciones se vería así:
    [
        {
            id: 9,
            nombre: "Viento",
            artista: "Caifanes",
            id_artista: 8,
            album: "Caifanes",
            id_album: 8,
            link: "T8TtE-enslA",
            genero: "Rock",
            id_genero: 3
        }
    
    
    ]
    // declarar un arreglo que sea el que vas a devolver
    let arreglo = []
    baseDeDatos.canciones
    // iteras el arreglo de canciones
    // Si el album de la cancion coincide con el parametro
    //  arreglo.push(baseDeDatos.canciones[i])
*/
function getCancionPorId(id) {
  for (let i = 0; i < baseDatosJSON.canciones.length; i++) {
    if (baseDatosJSON.canciones[i].id === id) {
      return baseDatosJSON.canciones[i];
    }
  }
  return null;
}

let inputMusica = document.getElementById("inputBusqueda");

inputMusica.addEventListener("input",()=>{
    let resultados=obtenerCancionesAlbumesArtistasPorString(inputMusica.value);
    console.log(resultados);
})