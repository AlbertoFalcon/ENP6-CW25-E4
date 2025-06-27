const artistasBtn = document.getElementById("ArtistasIco");
const albumesBtn = document.getElementById("AlbumesIco");
const cancionesBtn = document.getElementById("CancionesIco")
const mainMenuPrincipal = document.getElementById("mainMenuPrincipal")

artistasBtn.addEventListener("click", ()=>{
    const artistas = getArtistas();
    mainMenuPrincipal.innerHTML = "";
    for (let i = 0; i < artistas.length; i++) {
        let artista = artistas[i];
        const tarjeta = document.createElement("article");
        tarjeta.setAttribute("class","articulos");

        tarjeta.innerHTML = `
        <img src="${artista.url_img}" alt="${artista.nombre}" class="imagen-tarjeta">
        <br>
        <h3>${artista.nombre}</h3>
        <p>${artista.descripcion}</p>
        `;
        
        mainMenuPrincipal.appendChild(tarjeta);
    }
    }
)

albumesBtn.addEventListener("click", ()=>{
    const albums = getAlbums(); 
    mainMenuPrincipal.innerHTML = "";

    for (let i = 0; i < albums.length; i++) {
        const album = albums[i];

        const tarjeta = document.createElement("article");
        tarjeta.setAttribute("class","articulos");

        tarjeta.innerHTML = `
        <img src="${album.url_img}" alt="${album.nombre}" class="imagen-tarjeta">
        <h3>${album.nombre}</h3>
        <p>${album.descripcion}</p>
        <p>Artista: ${album.artista}</p>
        `;

        mainMenuPrincipal.appendChild(tarjeta);
    }
})
cancionesBtn.addEventListener("click", ()=>{
    const canciones = getCanciones();
    mainMenuPrincipal.innerHTML = "";
    for (let i = 0; i < canciones.length; i++) {
        const cancion = canciones[i];  
        const album = getAlbumPorId(cancion.id_album);
        const tarjeta = document.createElement("article");
        tarjeta.setAttribute("class","articulos");

        tarjeta.innerHTML = `
        <img src="${album.url_img}" alt="${cancion.nombre}" class="imagen-tarjeta">
        <h3>${cancion.nombre}</h3>
        <p>Artista:${cancion.artista}</p>
        <p>Álbum:${cancion.album}</p>
        <p>Género:${cancion.genero}</p>
        `;
        mainMenuPrincipal.appendChild(tarjeta);
    }
})