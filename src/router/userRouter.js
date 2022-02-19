import express from "express";
import { logout, userEdit, userProfile } from "../controller/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", userEdit);
userRouter.get("/:id([0-9a-f]{24})", userProfile);

export default userRouter;