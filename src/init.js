import "./db";
import "./models/Video";
import app from "./server";

const PORT = 8000;

const handleListen = () => {
    console.log(`✅ Listening on https://localhost:${PORT}`);
}
app.listen(PORT, handleListen);