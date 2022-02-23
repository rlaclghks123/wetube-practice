import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import globalRouter from "./router/globalRouter";
import userRouter from "./router/userRouter";
import videoRouter from "./router/videoRouter";

const app = express();


const logger = morgan("dev");






// setting
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
// middle ware
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.COOKIT_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.API_KEY })
}))

// Router
app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/videos", videoRouter);

export default app;
