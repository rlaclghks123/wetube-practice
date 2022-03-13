const videoContainer = document.querySelector("#videoContainer");
const form = document.querySelector("#commentForm");

const deleteBtn = document.querySelectorAll(".deleteBtn")

const handleDelete = async (event) => {
    const videoId = videoContainer.dataset.id;
    const comment = event.target.parentNode;
    const commentId = comment.dataset.id;
    comment.remove();

    await fetch(`/api/videos/${videoId}/commentDelete`, {
        method: "Delete",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId })
    });
}

const addComment = (text, id) => {
    const videoComments = document.querySelector(".video__comments ul");
    const newComment = document.createElement("li");
    newComment.className = "video__comment";
    const icon = document.createElement("i");
    icon.className = "fas fa-comment";
    newComment.dataset.id = id;

    const span = document.createElement("span");
    span.innerText = ` ${text}`;
    const span2 = document.createElement("span");
    span2.innerText = "❌";
    span2.className = "deleteBtn";

    newComment.appendChild(icon);
    newComment.appendChild(span);
    newComment.appendChild(span2);
    newComment.addEventListener("click", handleDelete);
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
    const response = await fetch(`/api/videos/${videoId}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text }),
    });
    if (response.status === 201) {
        textarea.value = "";
        const { newCommentId } = await response.json();
        addComment(text, newCommentId);
    }
}

if (form) {
    form.addEventListener("submit", handleSubmit);
}
if (deleteBtn) {
    deleteBtn.forEach((deleteBtn) => {
        deleteBtn.addEventListener("click", handleDelete);
    });
}

