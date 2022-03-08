const video = document.querySelector("#preview");


let stream;
const init = async () => {
    stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { width: 50, height: 50 },
    });
    video.srcObject = stream;
    video.play();
};
init();
