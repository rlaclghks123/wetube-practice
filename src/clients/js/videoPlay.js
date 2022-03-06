const video = document.querySelector("video");
const playBtn = document.querySelector("#playBtn");
const playBtnIcon = playBtn.querySelector("i");
const currentTime = document.querySelector("#currentTime");
const totalTime = document.querySelector("#totalTime");
const muteBtn = document.querySelector("#muteBtn");
const muteIcon = muteBtn.querySelector("i");
const volumeRange = document.querySelector("#volume");
const timeline = document.querySelector("#timeline");



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

const formatTime = (seconds) => {
    return new Date(seconds * 1000).toISOString().substr(14, 5);
}
const handleTotalTime = () => {
    totalTime.innerText = formatTime(video.duration);
    timeline.max = Math.floor(video.duration);
}

const handleTimeUpdate = () => {
    currentTime.innerText = formatTime(Math.floor(video.currentTime));
    timeline.value = Math.floor(video.currentTime);
    if (video.currentTime === video.duration) {
        playBtnIcon.className = "fas fa-redo";
    }
}

const handleTimeLineChange = (event) => {
    const { target: { value } } = event;
    video.currentTime = value;
}

playBtn.addEventListener("click", handlePlayBtn);
video.addEventListener("click", handlePlayBtn);
video.addEventListener("loadedmetadata", handleTotalTime);
video.addEventListener("timeupdate", handleTimeUpdate);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeRange);
timeline.addEventListener("input", handleTimeLineChange);