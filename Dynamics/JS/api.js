
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////                               NOTA                                          //////////////////////////////////
//////////////////////                                                                             //////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LOS CONTENIDOS DE ESTE CODIGO SE DEBEN IR DESCOMENTANDO A MEDIDA QUE YA TENGAMOS LOS ELEMENTOS HTML PARA EL CONTROL
// DEL PLAYER DE YOUTUBE


let player;
let duration = 0;
let lastVolume = 100;
let previousVolume;
let updateInterval;

let videoEnded = false; // Esta variable sera auxiliar. La usaremos en el stateChange. Si videoEnded == true y see activa 
// el evento stateChange, es porque se esta empezando a reproducir una canción nueva. Qué opinas? Es lo mejor que se me ocurre, no hay una
// manera directa de averiguar si un video se está empexzando a reproducir.
// Mi apuesta es que cuando uno termina, pasa por el estado ENDED, ahí usamos esta variable auxiliar, si se reproduce otra, entonces pasará
// por el estado PLAYING casi inmediatamente, pero ya tendríamos la variable auxiliar con el valor videoEnded == true. Vavava 
let primeraVezCargando = true; // Esta variable guardará si se cargará un video por primera vez

//const seekBar = document.getElementById("seekBar");
//const volumeSlider = document.getElementById("volumeSlider");
//const playPauseBtn = document.getElementById("playPauseBtn");
//const nextBtn = document.getElementById("nextBtn");
//const muteBtn = document.getElementById("muteBtn");
//const previousBtn = document.getElementById("previousBtn")

//const vidDuration = document.getElementById("duration");
//const currentTimeSpan = document.getElementById("currentTime");
let currentVolume;
let indiceActual = null;
let idCanciones = [1,5,6,7];

//playlist de todas las canciones q hay en la base de datos
function reproducirCancionPorId(id) {
  let cancion = getCancionPorId(id);
  if (cancion) {
    player.loadVideoById(cancion.link); 
  }
}

function onPlayerReady(event) {
    duration = player.getDuration();
    player.mute(); 
    player.playVideo();

    previousVolume = player.getVolume();
    //volumeSlider.value = previousVolume;     MODIFICAR CUANDO SE AGREGUE SLIDER DEL VOLUMEN
    //seekBar.max = duration;      MODIFICAR CUANDO SE AGREGUE LA SEEKBAR

    updateInterval = setInterval(() => {
        if (player && player.getPlayerState() === YT.PlayerState.PLAYING) {
            //seekBar.value = player.getCurrentTime();    MODIFICAR CUANDO SE AGREGUE LA SEEKBAR
        }

        currentVolume = player.getVolume();
        if (currentVolume !== previousVolume) {
            //volumeSlider.value = currentVolume;      MODIFICAR CUANDO SE AGREGUE EL SLIDER DEL VOLUMEM
            previousVolume = currentVolume;
        }

        if (player.isMuted()) {
            //muteBtn.textContent = "🔇";      MODIFICAR CUANDO SE AGREGUE BOTON DE MUTE
        } else {
            //muteBtn.textContent = "🔊";        MODIFICAR CUANDO SE AGREGUE BOTON DE MUTE
        }
    }, 1000);
}

function onPlayerStateChange(event){
    console.log("Evento tipo: " + event.data)
    if (event.data === -1 ){ // unstarted, se dispara cuando aún carga el video nuevo
        if (primeraVezCargando){
            indiceActual = 0;
            primeraVezCargando = false;
        }
    }

    if (event.data == YT.PlayerState.PLAYING) {
        if (videoEnded){
            duration = player.getDuration();
            //seekBar.max = duration;    MODIFICAR CUANDO SE AGREGUE LA SEEKBAR
            //seekBar.value = player.getCurrentTime();       MODIFICAR CUANDO SE AGREGUE LA SEEKBAR
            videoEnded = false;
        }
        //playPauseBtn.textContent = "⏸️";              MODIFICAR CUANDO SE AGREGUE EL BOTON DE PLAY
        
    } 
    else if (event.data == YT.PlayerState.PAUSED || event.data == YT.PlayerState.ENDED) {
        //playPauseBtn.textContent = "▶️";              MODIFICAR CUANDO SE AGREGUE EL BOTON DE PLAY
    }
    if (event.data === YT.PlayerState.ENDED) {
        indiceActual++;
        if (indiceActual >= idCanciones.length) {
            indiceActual = 0;
        }

        let siguienteId = idCanciones[indiceActual];
        reproducirCancionPorId(siguienteId); 

        //seekBar.value = 0;                                 MODIFICAR CUANDO SE AGREGUE LA SEEKBAR
        videoEnded=true;
        // Aquí nos gustaría obtener los datos de la cancion que se reproducirá, porque cuando termine la canción la queremos
        // reproducir, pero también necesitamos mostrar en el DOM el titulo de la canción, más otros datos
        // Pienso que eso sería muy sencillo si en nuestra cola de reproducción guardamos el id de la canción en la base, en vez del 
        // id del video (el que usa YouTube). Necesitamos una función que nos devuelva el objeto canción de la base de datos que coincida
        // con el id que pasemos como parametro.
        // Exacto, esto porque no solo necesitamos el link, necesitamos los datos para mostrar el nombre de la cancion que se esta 
        // reproduciendo xdxd Es muy sencilla esa funcion, no? Solo iterar hasta que encuentres un objjeto que tenga ese id
        // Junto con las otras funciones que necesitamos, quizá convenga hacer un archivo que se llame funcionesDeBusqueda.js
    }
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        videoId: baseDatosJSON.canciones[0].link,
        playerVars: {
            controls: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
        },
        events: {
            onReady: onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
    });
}

/*  MODIFICAR CUANDO HAYA BOTON DE PLAY
playPauseBtn.addEventListener("click", () => {
    let state = player.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
        player.pauseVideo();
        playPauseBtn.textContent = "▶️";
    } else {
        player.playVideo();
        playPauseBtn.textContent = "⏸️";
    }
});*/

/* MODIFICAR CUANDO HAYA SLIDER DEL VOLUMEN
volumeSlider.addEventListener("input", () => {
    const volume = parseInt(volumeSlider.value, 10);
    player.setVolume(volume);


    if (player.isMuted() && volume > 0) {
        player.unMute();
    }

    lastVolume = volume;
    previousVolume = volume;
});*/

/* MODIFICAR CUANDO HAYA BOTON DE MUTE
muteBtn.addEventListener("click", () => {
    if (player.isMuted()) {
        player.unMute();
        volumeSlider.value = lastVolume;
    } else {
        player.mute();
    }
});*/

/* MODIFICAR CUANDO HAYA SEEKBAR
seekBar.addEventListener("input", () => {
    let seekTo = seekBar.value;
    player.seekTo(seekTo, true);
});*/

/* MODIFICAR CUANDO HAYA BOTON DE NEXT
nextBtn.addEventListener("click", () => {
    if (indiceActual < idCanciones.length - 1) {
        indiceActual++;
    } else {
        indiceActual = 0;
    }
    let id = idCanciones[indiceActual];
    reproducirCancionPorId(id);
});*/

/* MODIFICAR CUANDO HAYA BOTON DE PREVIOUS
previousBtn.addEventListener("click", () => {
    if (indiceActual > 0) {
        indiceActual--;
    } else {
    indiceActual = idCanciones.length - 1;
    }
    let id = idCanciones[indiceActual];
    reproducirCancionPorId(id);
});*/

function mostrarColadeRep() {
    const ColadeRep = document.getElementById("playlist-queue");
    if (!ColadeRep) return;
    ColadeRep.innerHTML = ""; 

    for (let i = 0; i < idCanciones.length; i++) {
        const cancion = getCancionPorId(idCanciones[i]);
        if (!cancion) continue;
        const li = document.createElement("li");
        li.className = "playlist-item";
        li.innerHTML = `
            <div class="song-info">
                <span class="song-title">${cancion.nombre}</span>
                <span class="song-artist">${cancion.artista}</span>
            </div>
        `;
        ColadeRep.appendChild(li);
    }
}