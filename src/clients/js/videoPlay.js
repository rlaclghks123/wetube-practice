const video = document.querySelector("video");
const playBtn = document.querySelector("#playBtn");
const playBtnIcon = playBtn.querySelector("i");
const currentTime = document.querySelector("#currentTime");
const totalTime = document.querySelector("#totalTime");
const muteBtn = document.querySelector("#muteBtn");
const muteIcon = muteBtn.querySelector("i");
const volumeRange = document.querySelector("#volume");


let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayBtn = () => {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
}


const handleMute = () => {
    if (video.muted) {
        video.muted = false;
    } else {
        video.muted = true;
    }
    muteIcon.classList = video.muted ? "fas fa-volume-mute" : "fas fa-volume-up";
    volumeRange.value = video.muted ? 0 : volumeValue;
}

const handleVolumeRange = (event) => {
    const { target: { value } } = event;
    if (video.muted) {
        video.muted = false;
        muteIcon.classList = "fas fa-volume-mute";
    }
    volumeValue = value;
    video.volume = value;
    muteIcon.classList = video.volume === 0 ? "fas fa-volume-mute" : "fas fa-volume-up";
}

playBtn.addEventListener("click", handlePlayBtn);
video.addEventListener("click", handlePlayBtn);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeRange);