import express from "express";
import { logout, userEdit, userProfile, startGithubLogin, finishGithubLogin } from "../controller/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", userEdit);
userRouter.get("/:id([0-9a-f]{24})", userProfile);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);


export default userRouter;