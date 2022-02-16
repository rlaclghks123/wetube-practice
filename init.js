import express from "express";
import morgan from "morgan";

const app = express();

const PORT = 8000;
const logger = morgan("dev");



const handleListen = () => {
    console.log(`✅ Listening on https://localhost:${PORT}`);
}
app.listen(PORT, handleListen);
app.use(logger);

const home = (req, res) => {
    return res.send("Hi");
}
app.get("/", home);
