import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
    valid: {type: Boolean, default: true},
    userAgent: {type: String},
});

const Session = mongoose.model("session", sessionSchema);

export default Session;