import express from "express";
import { getVideoEdit, deleteVideo, postVideoEdit, videoProfile, watch, getVideoUpload, postVideoUpload } from "../controller/videoController";
import { privateMiddleWare } from "../localMiddleWare";
const videoRouter = express.Router();


videoRouter.get("/profile", privateMiddleWare, videoProfile);
videoRouter.route("/upload").get(privateMiddleWare, getVideoUpload).post(postVideoUpload);
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(privateMiddleWare, getVideoEdit).post(postVideoEdit);
videoRouter.get("/:id([0-9a-f]{24})/delete", privateMiddleWare, deleteVideo);
export default videoRouter;