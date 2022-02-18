
const videos = [{
    title: "apple",
    color: "red",
    id: 1,
},
{
    title: "banana",
    color: "yellow",
    id: 2,
},
{
    title: "orange",
    color: "orange",
    id: 3,
},
]

export const search = (req, res) => {
    return res.render("search", { pageTitle: "Search" });
}
export const watch = (req, res) => {
    const { id } = req.params;
    const video = videos[id - 1];
    return res.render("watch", { pageTitle: "watch", video });
}
export const videoEdit = (req, res) => {
    const { id } = req.params;
    const video = videos[id - 1];
    return res.render("videoEdit", { pageTitle: "VideoEdit", video });
}
export const videoUpload = (req, res) => {
    return res.render("videoUpload", { pageTitle: "VideoUpload" });
}
export const videoProfile = (req, res) => {
    return res.render("videoProfile", { pageTitle: "VideoProfile" });
}
