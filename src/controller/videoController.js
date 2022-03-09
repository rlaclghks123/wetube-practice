import Video from "../models/Video";
import User from "../models/User";


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
    const video = await Video.findById(id).populate("owner");


    if (!video) {
        return res.render("404", { pageTitle: "Error" });
    } else {
        return res.render("watch", { pageTitle: video.title, video });
    }
}

export const getVideoEdit = async (req, res) => {
    const { id } = req.params;
    const { user: { _id } } = req.session;
    const video = await Video.findById(id);
    if (!video) {
        return res.render("404", { pageTitle: "Error" });
    }
    if (String(video.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }
    return res.render("videoEdit", { pageTitle: "VideoEdit", video });

}
export const postVideoEdit = async (req, res) => {
    const { id } = req.params;
    const { title, description, hashtags } = req.body;
    const { user: { _id } } = req.session;
    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags: Video.formatHashtags(hashtags),
    });
    if (String(video.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }
    return res.redirect(`/videos/${id}`);
}
export const getVideoUpload = (req, res) => {
    return res.render("videoUpload", { pageTitle: "VideoUpload" });
}

export const postVideoUpload = async (req, res) => {

    const { user: { _id } } = req.session;
    const { title, description, hashtags } = req.body;
    const { video, thumb } = req.files;

    try {
        const newVideo = await Video.create({
            title,
            description,
            fileUrl: video[0].path,
            thumbUrl: thumb[0].path,
            hashtags: Video.formatHashtags(hashtags),
            meta: {
                views: 0,
                rating: 0
            },
            owner: _id
        });
        const user = await User.findById(_id);
        await user.videos.push(newVideo);
        user.save();
        return res.redirect("/");
    }

    catch (error) {
        return res.status(400).render("videoUpload", { pageTitle: "Upload Video", errorMessage: error._message });
    }
}

export const deleteVideo = async (req, res) => {
    const { id } = req.params;
    const { user: { _id } } = req.session;
    const video = await Video.findById(id);
    if (!video) {
        return res.render("404", { pageTitle: "Video Not Found", video });
    }
    if (String(video.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }
    await Video.findByIdAndDelete(id);

    return res.redirect("/");
}

export const videoProfile = (req, res) => {
    return res.render("videoProfile", { pageTitle: "VideoProfile" });
}

export const registerView = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.sendStatus(404);
    }
    video.meta.views = video.meta.views + 1;
    await video.save();
    return res.sendStatus(200);
}