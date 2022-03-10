const { default: fetch } = require("node-fetch");
const videoContainer = document.querySelector("#videoContainer");
const form = document.querySelector("#commentForm");



const handleSubmit = async (event) => {
    event.preventDefault();
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;
    if (text === "") {
        return;
    }
    textarea.value = " ";
    await fetch(`/api/videos/${videoId}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text }),
    });
}

if (form) {
    form.addEventListener("submit", handleSubmit);
}
