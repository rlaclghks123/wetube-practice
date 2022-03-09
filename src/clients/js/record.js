const video = document.querySelector("#preview");
const actionBtn = document.querySelector("#actionBtn");

let stream;
let recorder;
let videoFile;

const handleDownload = () => {
    const a = document.createElement("a");
    a.href = videoFile;
    a.download = "recording.webm";
    document.body.appendChild(a);
    a.click();
}

const handleStart = () => {
    actionBtn.innerText = "Recording..."
    actionBtn.disabled = true;
    actionBtn.removeEventListener("click", handleStart);

    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (event) => {
        videoFile = URL.createObjectURL(event.data);
        video.srcObject = null;
        video.src = videoFile;
        video.loop = true;
        video.play();
        actionBtn.innerText = "Donwload";
        actionBtn.disabled = false;
        actionBtn.addEventListener("click", handleDownload);
    };
    recorder.start();
    setTimeout(() => { recorder.stop() }, 3000);
}

const init = async () => {
    stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { width: 50, height: 50 },
    });
    video.srcObject = stream;
    video.play();
};
init();

actionBtn.addEventListener("click", handleStart);
