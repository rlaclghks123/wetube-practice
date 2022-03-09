import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localMiddleWare } from "./localMiddleWare"
import globalRouter from "./router/globalRouter";
import userRouter from "./router/userRouter";
import videoRouter from "./router/videoRouter";
import apiRouter from "./router/apiRouter";

const app = express();
const logger = morgan("dev");






// setting
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

// middle ware
app.use(logger);
app.use((req, res, next) => {
    res.header("Cross-Origin-Embedder-Policy", "require-corp");
    res.header("Cross-Origin-Opener-Policy", "same-origin");
    next();
});
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.COOKIT_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.API_KEY })
}));
app.use(localMiddleWare);
app.use("/uploads", express.static("uploads"))
app.use("/static", express.static("assets"));

// Router
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/api", apiRouter);

export default app;
