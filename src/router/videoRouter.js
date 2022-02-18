import express from "express";
import { videoEdit, videoUpload, videoProfile, watch } from "../controller/videoController";

const videoRouter = express.Router();

videoRouter.get("/upload", videoUpload);
videoRouter.get("/profile", videoProfile);
videoRouter.get("/:id/edit", videoEdit);
videoRouter.all("/:id", watch);

export default videoRouter;