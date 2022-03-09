import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const video = document.querySelector("#preview");
const actionBtn = document.querySelector("#actionBtn");

let stream;
let recorder;
let videoFile;

const handleDownload = async () => {

    const ffmpeg = createFFmpeg({
        log: true,
        corePath: "https://unpkg.com/@ffmpeg/core@0.8.5/dist/ffmpeg-core.js",
    });
    await ffmpeg.load();

    ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile));

    await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4");

    const mp4File = ffmpeg.FS("readFile", "output.mp4");

    const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });

    const mp4Url = URL.createObjectURL(mp4Blob);



    const a = document.createElement("a");
    a.href = mp4Url;
    a.download = "MyRecording.mp4";
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
