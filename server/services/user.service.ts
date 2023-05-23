import User, { UserDocument } from "../models/user.models";
export const createUser = async (input: object) => {
    try {
        const user = await User.create(input);
        return user;
    }
    catch(error: any) {
        console.log(error.message);
        return error.message;
    }
};

export const validatePassword = async ({email, password}: {email?:string, password?: string} = {}) => {
    const user = await User.findOne({email}); 
    if(!user || user.password != password) return false;

    return {
        _id: user._id,
        email: user.email
    };
};