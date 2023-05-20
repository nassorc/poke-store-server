import express from "express";
import mongoose from "mongoose";
import routes from "./routes";
const app = express();

app.get("/", (req, res) => {
    console.log("access home");
    res.sendStatus(200);
});

routes(app);

app.listen(3002, async () => {
    console.log("listening on port 3002");

    try {
        await mongoose.connect("mongodb+srv://poke-store:poke-store@poke-store-cluster.sqlfntl.mongodb.net/?retryWrites=true&w=majority");
        console.log("connected to database");
    }
    catch(error: any) {
        console.log(error.message);
    }
});
