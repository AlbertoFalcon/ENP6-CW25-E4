//funcion para devolver una canción con base en su id
function getCancionPorId(id) {
  for (let i = 0; i < baseDatosJSON.canciones.length; i++) {
    if (baseDatosJSON.canciones[i].id === id) {
      return baseDatosJSON.canciones[i];
    }
  }
  return null;
}

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
    if (baseDatosJSON.album[i].id_album === idAlbum) {
      canciones.push(baseDatosJSON.album[i]);
    }
  }
  return canciones;
}
//funcion para buscar canciones por genero con base en el id del genero