import express from "express";
import { getVideoEdit, postVideoEdit, videoUpload, videoProfile, watch } from "../controller/videoController";

const videoRouter = express.Router();

videoRouter.get("/upload", videoUpload);
videoRouter.get("/profile", videoProfile);
videoRouter.get("/:id(\\d+)", watch);
videoRouter.route("/:id(\\d+)/edit").get(getVideoEdit).post(postVideoEdit);

export default videoRouter;