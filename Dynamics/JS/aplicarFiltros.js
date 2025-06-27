/**
 * Este archivo gestiona la visualizacion de la interfaz principal, y también puede reproducir contenido en el reproductor de la 
 * API de YouTube. Al hacer clic en los botones de filtro, se generan tarjetas por artista, álbum o canción.
*/
const artistasBtn = document.getElementById("IcoArtistas");
const albumesBtn = document.getElementById("IcoAlbumes");
const cancionesBtn = document.getElementById("IcoCanciones")
const mainMenuPrincipal = document.getElementById("mainMenuPrincipal")

// Mostrar tarjetas de artistas y reproducir todas sus canciones al hacer clic en una tarjeta
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

        tarjeta.addEventListener("click", () => {
            const canciones = getCanciones();
            let ids = [];
            for (let j = 0; j < canciones.length; j++) {
                if (canciones[j].id_artista === artista.id){
                    ids.push(canciones[j].id);
                }
            }
            if (ids.length > 0) {
                idCanciones = ids;
                indiceActual = 0;
                reproducirCancionPorId(idCanciones[indiceActual]);
                mostrarColadeRep();
            }
        });
        mainMenuPrincipal.appendChild(tarjeta);
    }
    }
)

//  Mostrar tarjetas de álbumes y reproducir todas sus canciones al hacer clic en una tarjeta
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

        // Evento para reproducir todas las canciones del álbum seleccionado
        tarjeta.addEventListener("click", () => {
            const canciones = getCanciones();
            let ids = [];
            for (let j = 0; j < canciones.length; j++) {
                if (canciones[j].id_album === album.id) {
                    ids.push(canciones[j].id);
                }
            }
            if (ids.length > 0) {
                idCanciones = ids;
                indiceActual = 0;
                reproducirCancionPorId(idCanciones[indiceActual]);
                mostrarColadeRep();
            }
        });

        mainMenuPrincipal.appendChild(tarjeta);
    }
})

// Mostrar tarjetas de canciones y reproducir la canción seleccionada al hacer clic en una tarjeta
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

        tarjeta.addEventListener("click", () => {
            idCanciones = [cancion.id];
            indiceActual = 0;
            reproducirCancionPorId(cancion.id);
            mostrarColadeRep();
        });
        mainMenuPrincipal.appendChild(tarjeta);

    }
})