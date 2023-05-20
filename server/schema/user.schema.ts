import Joi from "joi";
export const userSchema = Joi.object({
    body: {
        username: Joi.string().min(3).max(30).required(),
        email: Joi.string().email({tlds: {allow: ["com", "ned"]}}),
        password: Joi.string().alphanum().required(),
        repeatPassword: Joi.ref("password")
    }
}).with("password", "repeatPassword");
