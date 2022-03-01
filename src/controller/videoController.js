import Video from "../models/Video";



export const home = async (req, res) => {
    const videos = await Video.find({});
    return res.render("home", { pageTitle: "Home", videos });
}

export const search = async (req, res) => {
    const { keyword } = req.query;
    let videos = [];
    if (keyword) {
        videos = await Video.find({
            title: {
                $regex: new RegExp(keyword, "i")
            },
        })
    };
    return res.render("search", { pageTitle: "Search", videos });
}

export const watch = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);

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
    const { title, description, hashtags } = req.body;

    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect(`/videos/${id}`);
}
export const getVideoUpload = (req, res) => {
    return res.render("videoUpload", { pageTitle: "VideoUpload" });
}

export const postVideoUpload = async (req, res) => {
    const { path } = req.file;
    const { title, description, hashtags } = req.body;

    try {
        await Video.create({
            title,
            description,
            fileUrl: path,
            hashtags: Video.formatHashtags(hashtags),
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

export const deleteVideo = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.render("404", { pageTitle: "Video Not Found", video });
    }
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
}

export const videoProfile = (req, res) => {
    return res.render("videoProfile", { pageTitle: "VideoProfile" });
}
