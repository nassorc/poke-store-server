import { createResponse } from "../utiles/createResponse";
import { httpRequestType } from "../types/appTypes";
const createUser = (a: object) => {
    console.log(a);
    return new Promise(() => "hello");
}; 

export async function createUserHandler(httpRequest: httpRequestType) {
    try {
        const user = await createUser(httpRequest); 
        return createResponse({user}, 200);
    }
    catch(error: any) {
        console.log(error.message);
        return createResponse({message: error.message}, 409);
    }
}