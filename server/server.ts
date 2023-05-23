import express from "express";
import mongoose from "mongoose";
import routes from "./routes";
import { config } from "dotenv";
import { deserializeUser } from "./middleware/deserializeUser";
config();

const app = express();

app.use(express.json());
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
