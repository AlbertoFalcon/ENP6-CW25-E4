let player;
let duration = 0;
let lastVolume = 100;
let previousVolume;
let updateInterval;

const seekBar = document.getElementById("seekBar");
const volumeSlider = document.getElementById("volumeSlider");
const playPauseBtn = document.getElementById("playPauseBtn");
const nextBtn = document.getElementById("nextBtn");
const muteBtn = document.getElementById("muteBtn");

const vidDuration = document.getElementById("duration");
const currentTimeSpan = document.getElementById("currentTime");
let currentVolume

//playlist de todas las canciones q hay en la base de datos
let urlsYoutube = [];
let indiceActual=0;
for (let i = 0; i < baseDatosJSON.canciones.length; i++) {
  let id = baseDatosJSON.canciones[i].link;
  urlsYoutube.push(id);
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
        playPauseBtn.textContent = "⏸️";
    } 
    else if (event.data == YT.PlayerState.PAUSED || event.data == YT.PlayerState.ENDED) {
        playPauseBtn.textContent = "▶️";
    }
    if (event.data === YT.PlayerState.ENDED) {
        clearInterval(updateInterval);
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
    indiceActual++;
    if (indiceActual >= urlsYoutube.length) {
        indiceActual = 0;
    }
    player.loadVideoById(urlsYoutube[indiceActual]);
});

previousBtn.addEventListener("click", () => {
    indiceActual--;
    if (indiceActual < 0) {
        indiceActual = urlsYoutube.length - 1;
    }
    player.loadVideoById(urlsYoutube[indiceActual]);
});