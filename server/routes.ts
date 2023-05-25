import { Express, Request, Response } from "express";
import { createUserHandler } from "./controllers/user.controller";
import { createUserSessionHandler, getUserSessionHandler } from "./controllers/session.controller";
import { controllerHandler } from "./middleware/controllerHandler"; 
import { validateResource} from "./middleware/validateResource";
import { userSchema } from "./schema/user.schema";
import { sessionSchema } from "./schema/session.schema";
import { requireUser } from "./middleware/requireUser";

function routes(app: Express) {
    app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
    app.post("/api/users", validateResource(userSchema), controllerHandler(createUserHandler));
    app.post("/api/sessions", validateResource(sessionSchema), controllerHandler(createUserSessionHandler));
    app.get("/api/sessions", requireUser, controllerHandler(getUserSessionHandler));
}

export default routes;