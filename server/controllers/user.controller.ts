import { createUser } from "../services/user.service";
import { createResponse } from "../utils/createResponse";
import { httpRequestType } from "../types/appTypes";

export async function createUserHandler(httpRequest: httpRequestType) {
    try {
        const user = await createUser(httpRequest.body); 
        return await createResponse({user}, 200);
    }
    catch(error: any) {
        console.log(error.message);
        return await createResponse({message: error.message}, 409);
    }
}