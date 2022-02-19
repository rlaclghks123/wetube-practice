import express from "express";
import { getVideoEdit, postVideoEdit, videoProfile, watch, getVideoUpload, postVideoUpload } from "../controller/videoController";

const videoRouter = express.Router();


videoRouter.get("/profile", videoProfile);
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getVideoEdit).post(postVideoEdit);
videoRouter.route("/upload").get(getVideoUpload).post(postVideoUpload);
export default videoRouter;