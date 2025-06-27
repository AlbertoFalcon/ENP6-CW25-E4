//funcion para devolver una canción con base en su id
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

/*  DESCOMENTAR CUANDO TENGAMOS DECLARADO EL INPUT DE MUSICA
let inputMusica = document.getElementById("inputBusqueda");

inputMusica.addEventListener("input",()=>{
    let resultados=obtenerCancionesAlbumesArtistasPorString(inputMusica.value);
    console.log(resultados);
})*/
// funcion para devolver todos los artistas de la base datos
//return un arreglo de objetos (objeto artista)
function getArtistas(){
  let artistas = [];
  for (let i = 0; i < baseDatosJSON.artistas.length; i++){
    artistas.push(baseDatosJSON.artistas[i]);
  }
  return artistas;
}

//funcion para devolver todos los albumes de la base de datos
////return un arreglo de objetos (objeto album)
function getAlbums(){
  let albums = [];
  for (let i = 0; i < baseDatosJSON.album.length; i++){
    albums.push(baseDatosJSON.album[i]);
  }
  return albums;
}

//funcion para devolver todas las canciones de la base de datos
////return un arreglo de objetos (objeto cancion)
function getCanciones(){
  let canciones = [];
  for (let i = 0; i < baseDatosJSON.canciones.length; i++){
    canciones.push(baseDatosJSON.canciones[i]);
  }
  return canciones;
}

//funcion para devolver todos los generos de la base de datos
////return un arreglo de objetos (objeto genero)
function getGeneros(){
  let generos = [];
  for (let i = 0; i < baseDatosJSON.genero.length; i++){
    generos.push(baseDatosJSON.genero[i]);
  }
  return generos;
}

//funcion para devolver los albumes de un artista con base en el id del artista
function getAlbumPorIdArtista(idArtista) {
  let albums = [];
  for (let i = 0; i < baseDatosJSON.album.length; i++) {
    if (baseDatosJSON.album[i].id_artista === idArtista) {
      albums.push(baseDatosJSON.album[i]);
    }
  }
  return albums;
}
//funcion para buscar las canciones de un album con base en el id del album
function getCancionesPorIdAlbum(idAlbum) {
  let canciones = [];
  for (let i = 0; i < baseDatosJSON.canciones.length; i++) {
    if (baseDatosJSON.canciones[i].id_album === idAlbum) {
      canciones.push(baseDatosJSON.canciones[i]);
    }
  }
  return canciones;
}
//funcion para buscar canciones por genero con base en el id del genero
function getCancionesPorIdGenero(idGenero) {
  let canciones = [];
  for (let i = 0; i < baseDatosJSON.canciones.length; i++) {
    if (baseDatosJSON.canciones[i].id_genero === idGenero) {
      canciones.push(baseDatosJSON.canciones[i]);
    }
  }
  return canciones;
}
