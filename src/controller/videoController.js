export const search = (req, res) => {
    return res.render("search", { pageTitle: "Search" });
}
export const videoEdit = (req, res) => {
    return res.render("videoEdit", { pageTitle: "VideoEdit" });
}
export const videoUpload = (req, res) => {
    return res.render("videoUpload", { pageTitle: "VideoUpload" });
}
export const videoProfile = (req, res) => {
    return res.render("videoProfile", { pageTitle: "VideoProfile" });
}