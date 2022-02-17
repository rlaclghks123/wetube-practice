import express from "express";

const userRouter = express.Router();

userRouter.get("logout", "");
userRouter.get("edit", "userEdit");
userRouter.get(":id", "userProfile");

export default userRouter;