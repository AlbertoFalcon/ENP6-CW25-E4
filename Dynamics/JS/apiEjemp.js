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

const seekBar = document.getElementById("seekBar");
const volumeSlider = document.getElementById("volumeSlider");
const playPauseBtn = document.getElementById("playPauseBtn");
const nextBtn = document.getElementById("nextBtn");
const muteBtn = document.getElementById("muteBtn");
const previousBtn = document.getElementById("previousBtn")

const vidDuration = document.getElementById("duration");
const currentTimeSpan = document.getElementById("currentTime");
let currentVolume

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
    volumeSlider.value = previousVolume;
    seekBar.max = duration;

    updateInterval = setInterval(() => {
        if (player && player.getPlayerState() === YT.PlayerState.PLAYING) {
            seekBar.value = player.getCurrentTime();
        }

        currentVolume = player.getVolume();
        if (currentVolume !== previousVolume) {
            volumeSlider.value = currentVolume;
            previousVolume = currentVolume;
        }

        if (player.isMuted()) {
            muteBtn.textContent = "🔇";
        } else {
            muteBtn.textContent = "🔊";
        }
    }, 1000);
}

function onPlayerStateChange(event){
    if (event.data == YT.PlayerState.PLAYING) {
        if (videoEnded){
            duration = player.getDuration();
            seekBar.max = duration;
            seekBar.value = player.getCurrentTime();
            videoEnded = false;
        }
        playPauseBtn.textContent = "⏸️";
        
    } 
    else if (event.data == YT.PlayerState.PAUSED || event.data == YT.PlayerState.ENDED) {
        playPauseBtn.textContent = "▶️";
    }
    if (event.data === YT.PlayerState.ENDED) {
        indiceActual++;
        if (indiceActual >= idCanciones.length) {
            indiceActual = 0;
        }

        let siguienteId = idCanciones[indiceActual];
        reproducirCancionPorId(siguienteId); 

        seekBar.value = 0;
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


playPauseBtn.addEventListener("click", () => {
    let state = player.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
        player.pauseVideo();
        playPauseBtn.textContent = "▶️";
    } else {
        player.playVideo();
        playPauseBtn.textContent = "⏸️";
    }
});

volumeSlider.addEventListener("input", () => {
    const volume = parseInt(volumeSlider.value, 10);
    player.setVolume(volume);


    if (player.isMuted() && volume > 0) {
        player.unMute();
    }

    lastVolume = volume;
    previousVolume = volume;
});

muteBtn.addEventListener("click", () => {
    if (player.isMuted()) {
        player.unMute();
        volumeSlider.value = lastVolume;
    } else {
        player.mute();
    }
});

seekBar.addEventListener("input", () => {
    let seekTo = seekBar.value;
    player.seekTo(seekTo, true);
});

nextBtn.addEventListener("click", () => {
    if (indiceActual < idCanciones.length - 1) {
        indiceActual++;
    } else {
        indiceActual = 0;
    }
    let id = idCanciones[indiceActual];
    reproducirCancionPorId(id);
});

previousBtn.addEventListener("click", () => {
    if (indiceActual > 0) {
        indiceActual--;
    } else {
    indiceActual = idCanciones.length - 1;
    }
    let id = idCanciones[indiceActual];
    reproducirCancionPorId(id);
});