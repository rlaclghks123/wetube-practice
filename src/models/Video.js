import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
    title: { type: String, required: true },
    descripton: { type: String, required: true },
    createdAt: { type: Number, required: true, default: Date.now },
    meta: {
        views: { type: Number, default: 0, required: true },
        rating: { type: Number, default: 0, required: true }
    },

})
const Video = mongoose.model("Video", videoSchema);

export default Video;