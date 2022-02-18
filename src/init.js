import express from "express";
import "./db";
import "./models/Video";
import morgan from "morgan";
import globalRouter from "./router/globalRouter";
import userRouter from "./router/userRouter";
import videoRouter from "./router/videoRouter";

const app = express();

const PORT = 8000;
const logger = morgan("dev");




const handleListen = () => {
    console.log(`✅ Listening on https://localhost:${PORT}`);
}
app.listen(PORT, handleListen);

// setting
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

// middle ware
app.use(logger);
app.use(express.urlencoded({ extended: true }));

// Router
app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/videos", videoRouter);


