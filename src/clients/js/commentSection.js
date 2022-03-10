
const videoContainer = document.querySelector("#videoContainer");
const form = document.querySelector("#commentForm");


const addComment = (text) => {
    const videoComments = document.querySelector(".video__comments ul");
    const newComment = document.createElement("li");
    const icon = document.createElement("i");
    icon.className = "fas fa-comment";

    const span = document.createElement("span");
    span.innerText = ` ${text}`;

    newComment.appendChild(icon);
    newComment.appendChild(span);
    videoComments.prepend(newComment);

};

const handleSubmit = async (event) => {
    event.preventDefault();
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;
    if (text === "") {
        return;
    }
    const { status } = await fetch(`/api/videos/${videoId}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text }),
    });
    if (status == 201) {
        textarea.value = " ";
        addComment(text);
    }
}

if (form) {
    form.addEventListener("submit", handleSubmit);
}
