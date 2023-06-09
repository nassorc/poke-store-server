import mongoose from "mongoose";

export interface UserDocument {
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
}

const userSchema = new mongoose.Schema({
    email: {type:String, required: true, unique: true},
    password: {type:String, required: true}
}, {
    timestamps: true
});

// userSchema.method.comparePassword = async function(candidatePassword: string): Promise<boolean> {
    
//     return true;
// };

const User = mongoose.model("user", userSchema);

export default User;