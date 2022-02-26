import express from "express";
import { logout, userEdit, userProfile, startGithubLogin, finishGithubLogin } from "../controller/userController";
import { privateMiddleWare, publicMiddleWare } from "../localMiddleWare";
const userRouter = express.Router();

userRouter.get("/logout", privateMiddleWare, logout);
userRouter.get("/edit", privateMiddleWare, userEdit);
userRouter.get("/:id([0-9a-f]{24})", privateMiddleWare, userProfile);
userRouter.get("/github/start", publicMiddleWare, startGithubLogin);
userRouter.get("/github/finish", publicMiddleWare, finishGithubLogin);


export default userRouter;