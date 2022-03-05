const playBtn = document.querySelector("#playBtn");
const playBtnIcon = playBtn.querySelector("i");
const currentTime = document.querySelector("#currentTime");
const totalTime = document.querySelector("#totalTime");
const mute = document.querySelector("#mute");
const video = document.querySelector("video");


const handlePlayBtn = () => {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }

    playBtnIcon.className = video.paused ? "fas fa-play" : "fas fa-pause";
}


const handleMute = () => {

}
playBtn.addEventListener("click", handlePlayBtn)
mute.addEventListener("click", handleMute)