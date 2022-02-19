import Video from "../models/Video";

export const home = async (req, res) => {
    const videos = await Video.find({});
    return res.render("home", { pageTitle: "Home", videos });
}


export const watch = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    console.log(video);
    if (!video) {
        return res.render("404", { pageTitle: "Error" });
    } else {
        return res.render("watch", { pageTitle: video.title, video });
    }
}

export const getVideoEdit = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.render("404", { pageTitle: "Error" });
    } else {
        return res.render("videoEdit", { pageTitle: "VideoEdit", video });
    }
}
export const postVideoEdit = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    await Video.findByIdAndUpdate(id, title);
    return res.redirect(`/videos/${id}`);
}
export const getVideoUpload = (req, res) => {
    return res.render("videoUpload", { pageTitle: "VideoUpload" });
}

export const postVideoUpload = async (req, res) => {
    const { title, description, hashtags } = req.body;
    try {

        await Video.create({
            title,
            description,
            hashtags: hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`)),
            createdAt: Date.now(),
            meta: {
                views: 0,
                rating: 0
            }
        });
        return res.redirect("/");
    }
    catch (error) {
        return res.render("videoUpload", { pageTitle: "Upload Video", errorMessage: error._message });
    }
}
export const videoProfile = (req, res) => {
    return res.render("videoProfile", { pageTitle: "VideoProfile" });
}
