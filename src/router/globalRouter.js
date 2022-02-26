import express from "express";
import { getJoin, postJoin, getLogin, postLogin } from "../controller/userController";
import { home, search } from "../controller/videoController";
import { publicMiddleWare } from "../localMiddleWare";
const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.route("/join").get(publicMiddleWare, getJoin).post(postJoin);
globalRouter.route("/login").get(publicMiddleWare, getLogin).post(postLogin);
globalRouter.get("/search", search);

export default globalRouter;
