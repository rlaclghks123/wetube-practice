import express from "express";
import { logout, userEdit, userProfile } from "../controller/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", userEdit);
userRouter.get("/:id", userProfile);

export default userRouter;