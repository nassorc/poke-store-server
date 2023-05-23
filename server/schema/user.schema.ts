import Joi from "joi";
export const userSchema = Joi.object({
    body: Joi.object({
        email: Joi.string().email({tlds: {allow: ["com", "ned"]}}),
        password: Joi.string().alphanum().required(),
        repeatPassword: Joi.ref("password")
    }).required().with("password", "repeatPassword"),
    params: Joi.object({
        userId: Joi.string(),
    }).optional(),
});

