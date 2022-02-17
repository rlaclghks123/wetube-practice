import express from "express";
import { videoEdit, videoUpload, videoProfile } from "../controller/videoController";

const videoRouter = express.Router();

videoRouter.get("/edit", videoEdit);
videoRouter.get("/upload", videoUpload);
videoRouter.get("/profile", videoProfile);

export default videoRouter;