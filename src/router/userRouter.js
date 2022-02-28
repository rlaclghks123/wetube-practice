import express from "express";
import { logout, getEdit, postEdit, getChange_password, postChange_password, userProfile, startGithubLogin, finishGithubLogin } from "../controller/userController";
import { privateMiddleWare, publicMiddleWare, avatarUpload } from "../localMiddleWare";
const userRouter = express.Router();

userRouter.get("/logout", privateMiddleWare, logout);
userRouter.route("/edit", privateMiddleWare).get(getEdit).post(avatarUpload.single("avatar"), postEdit);
userRouter.route("/change_password", privateMiddleWare).get(getChange_password).post(postChange_password);
userRouter.get("/:id([0-9a-f]{24})", privateMiddleWare, userProfile);
userRouter.get("/github/start", publicMiddleWare, startGithubLogin);
userRouter.get("/github/finish", publicMiddleWare, finishGithubLogin);
userRouter.get("/:id([0-9a-f]{24})", userProfile);


export default userRouter;