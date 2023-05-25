import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./routes";
import { config } from "dotenv";
import { deserializeUser } from "./middleware/deserializeUser";
config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(deserializeUser);
routes(app);

app.listen(3002, async () => {
    console.log("listening on port 3002");
    try {
        const connectionStr = process.env.MONGODB_URI || "";
        await mongoose.connect(connectionStr);
        console.log("connected to database");
    }
    catch(error: any) {
        console.log(error.message);
    }
});
