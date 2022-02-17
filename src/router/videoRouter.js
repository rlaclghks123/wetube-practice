import express from "express";

const videoRouter = express.Router();

videoRouter.get("edit", videoEdit);
videoRouter.get("upload", videoUpload);
videoRouter.get("profile", videoProfile);

export default videoRouter;