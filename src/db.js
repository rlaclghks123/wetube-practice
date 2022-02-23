import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.API_KEY, { useNewUrlParser: true });

const db = mongoose.connection


const handleOpen = () => { console.log("✅ Connected DB") };

const handleError = (error) => { console.log("❌ DB Error", error) }
db.on("error", handleError);
db.once("open", handleOpen)